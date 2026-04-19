package com.zorexapps.zeroescape;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.VpnService;
import android.os.Build;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

public class ZeroEscapeVpnService extends VpnService {

    private static final String TAG        = "ZeroEscapeVPN";
    private static final String CHANNEL_ID = "ze_vpn_protection";
    private static final int    NOTIF_ID   = 2001;
    private static final String REAL_DNS   = "8.8.8.8";
    private static final int    DNS_PORT   = 53;
    private static final int    MTU        = 1500;

    public static final String ACTION_START = "ACTION_START";
    public static final String ACTION_STOP  = "ACTION_STOP";

    private ParcelFileDescriptor tunFd;
    private ExecutorService      executor;
    private final AtomicBoolean  running = new AtomicBoolean(false);

    // ─────────────────────────────────────────────────────────────────────────
    // Blocked domains — checked via exact match OR subdomain suffix match.
    // NOT shown in any UI; invisible to the end-user.
    // ─────────────────────────────────────────────────────────────────────────
    private static final Set<String> BLOCKED = new HashSet<>(Arrays.asList(
        // ── Major tube platforms ──────────────────────────────────────────────
        "pornhub.com", "xvideos.com", "xnxx.com", "xhamster.com",
        "redtube.com", "youporn.com", "tube8.com", "spankbang.com",
        "beeg.com", "tnaflix.com", "thumbzilla.com", "ixxx.com",
        "4tube.com", "porndig.com", "cliphunter.com", "ah-me.com",
        "porn.com", "hclips.com", "drtuber.com", "eporner.com",
        "sunporno.com", "youjizz.com", "hardsextube.com",
        "pornrabbit.com", "24porn.com", "pornoxo.com", "maturetube.com",
        "fapality.com", "pornflip.com", "hornbunny.com", "pornhat.com",
        "pornlib.com", "nudevista.com", "slutload.com", "alohatube.com",
        "sexvid.xxx", "playvid.com", "empflix.com", "videosz.com",
        "porntube.com", "homemoviestube.com", "pornative.com",
        "pandamovies.com", "sexhd.tv", "sextb.net", "bigtitslust.com",
        "wetplace.com", "analpornstars.com", "sexu.com", "smutr.com",
        "xcafe.com", "goldporn.com", "cumlouder.com", "desixnxx.net",
        "hotmovs.com", "tukif.com", "alpha-porno.com", "sexoasis.com",
        "giga-porno.com", "pornoid.com", "watchmygf.com", "netfapx.com",
        "newporn.pro", "finevids.com", "maxporn.net", "pornorama.com",
        "porntrex.com", "toroporno.com", "redwap.com", "xxxdan.com",
        "xxxbunker.com", "xxxvogue.net", "anyporn.com", "bravoteens.com",
        "motherless.com",
        // ── Premium / subscription studios ───────────────────────────────────
        "naughtyamerica.com", "realitykings.com", "bangbros.com",
        "brazzers.com", "digitalplayground.com", "kink.com",
        "penthouse.com", "hustler.com", "wicked.com", "vivid.com",
        "playboy.com", "mofos.com", "teamskeet.com", "pornpros.com",
        "pervcity.com", "fakehub.com", "fakings.com", "milffox.com",
        "porngo.com", "nubiles.net", "bangbrosnetwork.com",
        "mofosexclusive.com", "xempire.com", "fantasymassage.com",
        "blacked.com", "vixen.com", "tushy.com", "deeper.com",
        "slayed.com", "mylf.com", "povd.com", "povlife.com",
        "8muses.com",
        // ── Creator platforms ─────────────────────────────────────────────────
        "onlyfans.com", "fansly.com", "manyvids.com", "clips4sale.com",
        "iwantclips.com",
        // ── JAV / Asian ───────────────────────────────────────────────────────
        "javhd.com", "javmost.com", "javbus.com", "javfree.me",
        "hpjav.tv", "caribbeancom.com", "fc2.com", "sukebe.tv",
        // ── Hentai / anime ────────────────────────────────────────────────────
        "nhentai.net", "hentaigasm.com", "hentai2read.com", "hentai.tv",
        "hentaihaven.xxx", "hanime.tv", "rule34.xxx", "e621.net",
        // ── Ad networks used exclusively by adult sites ───────────────────────
        "trafficjunky.net", "exoclick.com", "juicyads.com",
        "ero-advertising.com", "adxpansion.com", "plugrush.com",
        "adultforce.com", "adsvid.com",
        // ── Sex / escort / chat ───────────────────────────────────────────────
        "sex.com", "adultfriendfinder.com", "ashleymadison.com",
        "camsoda.com", "chaturbate.com", "bongacams.com",
        "livejasmin.com", "streamate.com", "flirt4free.com",
        "imlive.com", "stripchat.com", "myfreecams.com",
        "cam4.com", "camcontacts.com", "sexier.com"
    ));

    /** Returns true if the hostname (or any parent domain) is on the blocklist. */
    public static boolean isBlockedDomain(String hostname) {
        if (hostname == null || hostname.isEmpty()) return false;
        String h = hostname.toLowerCase().trim();
        if (h.endsWith(".")) h = h.substring(0, h.length() - 1);
        if (BLOCKED.contains(h)) return true;
        // Subdomain walk: www.pornhub.com → pornhub.com
        int dot = h.indexOf('.');
        while (dot != -1 && dot < h.length() - 1) {
            if (BLOCKED.contains(h.substring(dot + 1))) return true;
            dot = h.indexOf('.', dot + 1);
        }
        return false;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Service lifecycle
    // ─────────────────────────────────────────────────────────────────────────

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_STOP.equals(intent.getAction())) {
            stopVpn();
            stopForeground(true);
            stopSelf();
            return START_NOT_STICKY;
        }
        createNotificationChannel();
        startForeground(NOTIF_ID, buildNotification());
        if (!running.get()) startVpn();
        return START_STICKY;
    }

    @Override
    public void onRevoke() {
        // Called by Android when user disables the VPN from system settings
        stopVpn();
        super.onRevoke();
    }

    @Override
    public void onDestroy() {
        stopVpn();
        super.onDestroy();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // VPN setup
    // ─────────────────────────────────────────────────────────────────────────

    private void startVpn() {
        try {
            Builder builder = new Builder()
                .setSession("ZeroEscape Web Protection")
                // VPN interface address (must be in same /24 as our virtual DNS)
                .addAddress("10.0.0.2", 24)
                // Only route traffic destined for our virtual DNS — no other traffic affected
                .addRoute("10.0.0.1", 32)
                // Tell Android: use 10.0.0.1 as DNS server (we intercept it)
                .addDnsServer("10.0.0.1")
                .setMtu(MTU)
                .setBlocking(false);

            // Prevent our own traffic from looping back through the VPN
            try { builder.addDisallowedApplication(getPackageName()); } catch (Exception ignored) {}

            tunFd = builder.establish();
            if (tunFd == null) { stopSelf(); return; }

            running.set(true);
            executor = Executors.newSingleThreadExecutor(r -> {
                Thread t = new Thread(r, "ZeroEscape-VPN-Worker");
                t.setDaemon(true);
                return t;
            });
            executor.submit(this::processPackets);

        } catch (Exception e) {
            Log.e(TAG, "VPN start failed", e);
            stopSelf();
        }
    }

    private void stopVpn() {
        running.set(false);
        if (executor != null) {
            executor.shutdownNow();
            executor = null;
        }
        if (tunFd != null) {
            try { tunFd.close(); } catch (IOException ignored) {}
            tunFd = null;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Packet processing loop
    // Reads raw IPv4/UDP packets from the TUN, intercepts DNS (port 53), and
    // either blocks (NXDOMAIN) or forwards to the real DNS server (8.8.8.8).
    // ─────────────────────────────────────────────────────────────────────────

    private void processPackets() {
        try (
            FileInputStream  in  = new FileInputStream(tunFd.getFileDescriptor());
            FileOutputStream out = new FileOutputStream(tunFd.getFileDescriptor())
        ) {
            byte[] buf = new byte[MTU];

            while (running.get()) {
                int len = in.read(buf);
                if (len <= 0) continue;

                // ── Minimum sanity: IPv4, UDP, DNS ──────────────────────────────
                if (len < 28) continue;
                if ((buf[0] & 0xF0) != 0x40) continue; // Not IPv4
                if (buf[9] != 17) continue;             // Not UDP

                int ihl     = (buf[0] & 0x0F) * 4;
                int dstPort = ((buf[ihl + 2] & 0xFF) << 8) | (buf[ihl + 3] & 0xFF);
                if (dstPort != DNS_PORT) continue;      // Not DNS

                // ── Extract source IP and port for the reply ─────────────────
                byte[] srcIp  = Arrays.copyOfRange(buf, 12, 16);
                int    srcPort = ((buf[ihl] & 0xFF) << 8) | (buf[ihl + 1] & 0xFF);

                // ── Extract DNS payload ──────────────────────────────────────
                int    dnsOffset  = ihl + 8;
                int    dnsLen     = len - dnsOffset;
                if (dnsLen < 12) continue;
                byte[] dnsPayload = Arrays.copyOfRange(buf, dnsOffset, len);

                // ── Check hostname ───────────────────────────────────────────
                String  hostname  = parseDnsQueryName(dnsPayload);
                byte[]  response;

                if (isBlockedDomain(hostname)) {
                    response = buildNxdomainResponse(dnsPayload);
                } else {
                    response = forwardToRealDns(dnsPayload, dnsLen);
                    if (response == null) continue;
                }

                // ── Write response IP/UDP packet back to TUN ─────────────────
                byte[] reply = wrapInIpUdp(srcIp, srcPort, response);
                out.write(reply);
            }
        } catch (Exception e) {
            if (running.get()) Log.e(TAG, "Packet loop error", e);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DNS helpers
    // ─────────────────────────────────────────────────────────────────────────

    /** Parses the QNAME from a DNS query payload (starts at byte offset 12). */
    private String parseDnsQueryName(byte[] dns) {
        StringBuilder sb = new StringBuilder();
        int i = 12;
        while (i < dns.length && dns[i] != 0) {
            int labelLen = dns[i] & 0xFF;
            i++;
            if (i + labelLen > dns.length) break;
            if (sb.length() > 0) sb.append('.');
            sb.append(new String(dns, i, labelLen));
            i += labelLen;
        }
        return sb.toString().toLowerCase();
    }

    /**
     * Builds a minimal NXDOMAIN response:
     * same header as query, flags = QR|RD|RA|RCODE=3, all RR counts = 0.
     */
    private byte[] buildNxdomainResponse(byte[] query) {
        byte[] resp = Arrays.copyOf(query, query.length);
        // Flags: 0x8183 — QR=1, RD=1, RA=1, RCODE=3 (Name Error / NXDOMAIN)
        resp[2] = (byte) 0x81;
        resp[3] = (byte) 0x83;
        // Zero out ANCOUNT, NSCOUNT, ARCOUNT
        resp[6] = 0; resp[7] = 0;
        resp[8] = 0; resp[9] = 0;
        resp[10] = 0; resp[11] = 0;
        return resp;
    }

    /**
     * Forwards the DNS query to 8.8.8.8 via a protected socket (bypasses VPN)
     * and returns the raw DNS response, or null on timeout/error.
     */
    private byte[] forwardToRealDns(byte[] query, int queryLen) {
        try (DatagramSocket socket = new DatagramSocket()) {
            protect(socket); // Exempt from VPN routing → goes to real internet
            socket.setSoTimeout(3000);
            InetAddress    dnsAddr  = InetAddress.getByName(REAL_DNS);
            DatagramPacket request  = new DatagramPacket(query, queryLen, dnsAddr, DNS_PORT);
            socket.send(request);
            byte[]         respBuf  = new byte[MTU];
            DatagramPacket response = new DatagramPacket(respBuf, respBuf.length);
            socket.receive(response);
            return Arrays.copyOf(respBuf, response.getLength());
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Wraps a DNS payload in a minimal IPv4/UDP packet so it can be written
     * back to the TUN file descriptor.
     * Source = 10.0.0.1:53 (our virtual DNS server)
     * Destination = original requester
     */
    private byte[] wrapInIpUdp(byte[] dstIp, int dstPort, byte[] dnsPayload) {
        final byte[] srcIp  = {10, 0, 0, 1};
        final int    udpLen = 8 + dnsPayload.length;
        final int    ipLen  = 20 + udpLen;

        ByteBuffer pkt = ByteBuffer.allocate(ipLen).order(ByteOrder.BIG_ENDIAN);

        // ── IPv4 header ──────────────────────────────────────────────────────
        pkt.put((byte) 0x45);           // Version=4, IHL=5 (20 bytes)
        pkt.put((byte) 0x00);           // DSCP/ECN
        pkt.putShort((short) ipLen);    // Total length
        pkt.putShort((short) 0x1234);   // Identification (arbitrary)
        pkt.putShort((short) 0x4000);   // Flags: DF, fragment offset=0
        pkt.put((byte) 64);             // TTL
        pkt.put((byte) 17);             // Protocol: UDP
        pkt.putShort((short) 0);        // Checksum placeholder (filled below)
        pkt.put(srcIp);
        pkt.put(dstIp);

        // Fill IP checksum
        int checksum = ipv4Checksum(pkt.array(), 0, 20);
        pkt.putShort(10, (short) checksum);

        // ── UDP header ───────────────────────────────────────────────────────
        pkt.putShort((short) DNS_PORT); // Src port = 53
        pkt.putShort((short) dstPort);  // Dst port = original query src port
        pkt.putShort((short) udpLen);   // UDP length
        pkt.putShort((short) 0);        // Checksum = 0 (optional in IPv4)

        // ── DNS payload ──────────────────────────────────────────────────────
        pkt.put(dnsPayload);

        return pkt.array();
    }

    /** Standard one's-complement IPv4 header checksum. */
    private int ipv4Checksum(byte[] header, int offset, int length) {
        int sum = 0;
        for (int i = offset; i < offset + length - 1; i += 2) {
            sum += ((header[i] & 0xFF) << 8) | (header[i + 1] & 0xFF);
        }
        if ((length & 1) != 0) {
            sum += (header[offset + length - 1] & 0xFF) << 8;
        }
        while ((sum >> 16) != 0) {
            sum = (sum & 0xFFFF) + (sum >> 16);
        }
        return ~sum & 0xFFFF;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Foreground notification
    // ─────────────────────────────────────────────────────────────────────────

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(
                CHANNEL_ID,
                "حماية الويب",
                NotificationManager.IMPORTANCE_LOW
            );
            ch.setDescription("ZeroEscape يحجب المحتوى الإباحي");
            ch.setShowBadge(false);
            ((NotificationManager) getSystemService(NOTIFICATION_SERVICE))
                .createNotificationChannel(ch);
        }
    }

    private Notification buildNotification() {
        Intent stopIntent = new Intent(this, ZeroEscapeVpnService.class);
        stopIntent.setAction(ACTION_STOP);
        PendingIntent stopPending = PendingIntent.getService(
            this, 0, stopIntent,
            PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT
        );

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("حماية الويب نشطة")
            .setContentText("المواقع الضارة محجوبة أثناء الجلسة")
            .setSmallIcon(android.R.drawable.ic_lock_lock)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(true)
            .addAction(android.R.drawable.ic_menu_close_clear_cancel, "إيقاف", stopPending)
            .build();
    }
}
