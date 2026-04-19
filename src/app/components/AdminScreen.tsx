/**
 * AdminScreen — Full Admin Dashboard
 * ─────────────────────────────────────────────────────────────────────────
 * Three tabs: Dashboard | Users | Orders
 * Only reachable after correct admin PIN.
 * All mutations go through subscriptionService → Firestore.
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Users,
  ShoppingBag,
  BarChart2,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Pause,
  Trash2,
  UserX,
  UserCheck,
  Link,
  Plus,
  StickyNote,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuthStore, ADMIN_EMAIL } from '../../store/authStore';
import {
  subscriptionService,
  SUBSCRIPTION_PLANS,
  type UserDoc,
  type PaymentOrder,
  type DashboardStats,
  type OrderStatus,
} from '../../services/subscriptionService';
import type { AccountStatus, SubscriptionPlan } from '../../store/authStore';

type Tab = 'dashboard' | 'users' | 'orders';
type UserFilter = AccountStatus | 'all';
type OrderFilter = OrderStatus | 'all';

// ── Small reusable components ──────────────────────────────────────────────

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-slate-500 text-xs">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: AccountStatus | OrderStatus }) {
  const map: Record<string, string> = {
    guest_trial:       'text-sky-400 bg-sky-500/10 border-sky-500/20',
    registered_trial:  'text-blue-400 bg-blue-500/10 border-blue-500/20',
    active:            'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    expired:           'text-slate-400 bg-slate-500/10 border-slate-500/20',
    suspended:         'text-red-400 bg-red-500/10 border-red-500/20',
    pending:           'text-amber-400 bg-amber-500/10 border-amber-500/20',
    approved:          'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rejected:          'text-red-400 bg-red-500/10 border-red-500/20',
  };
  const label: Record<string, string> = {
    guest_trial: 'Guest Trial',
    registered_trial: 'Registered Trial',
    active: 'Active',
    expired: 'Expired',
    suspended: 'Suspended',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${map[status] ?? ''}`}>
      {label[status] ?? status}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function AdminScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const adminId = user?.id ?? '';

  const [tab, setTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<UserFilter>('all');
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('all');

  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Note input state
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});

  // Grant subscription dialog
  const [grantUserId, setGrantUserId] = useState<string | null>(null);
  const [grantPlan, setGrantPlan] = useState<SubscriptionPlan>('monthly');

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [s, u, o] = await Promise.all([
        subscriptionService.getDashboardStats(),
        subscriptionService.getUsers('all'),
        subscriptionService.getOrders('all'),
      ]);
      setStats(s);
      setUsers(u);
      setOrders(o);
    } catch (e) {
      setError('Failed to load data. Check Firestore rules.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const fmtDate = (ms: number | null) =>
    ms ? new Date(ms).toLocaleDateString('ar-EG') : '—';

  const daysLeft = (endAt: number | null) => {
    if (!endAt) return 0;
    return Math.max(0, Math.ceil((endAt - Date.now()) / 86400000));
  };

  const filteredUsers = users
    .filter(u => userFilter === 'all' || u.accountStatus === userFilter)
    .filter(u =>
      !userSearch ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.includes(userSearch)
    );

  const filteredOrders = orders.filter(
    o => orderFilter === 'all' || o.status === orderFilter
  );

  // ── Actions ──────────────────────────────────────────────────────────────

  const doAction = async (label: string, fn: () => Promise<void>) => {
    setError('');
    try {
      await fn();
      await loadDashboard();
    } catch (e) {
      setError(`${label} failed: ${e}`);
    }
  };

  // ── Render: Dashboard tab ────────────────────────────────────────────────

  const renderDashboard = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-base">Dashboard</h2>
        <button onClick={loadDashboard} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Users"        value={stats.totalUsers}        color="text-white" />
          <StatCard label="Active Users"       value={stats.activeUsers}       color="text-emerald-400" />
          <StatCard label="Subscribers"        value={stats.subscribers}       color="text-blue-400" />
          <StatCard label="Expired"            value={stats.expired}           color="text-slate-400" />
          <StatCard label="Pending Orders"     value={stats.pendingOrders}     color="text-amber-400" />
          <StatCard label="Trial Accounts"     value={stats.trialAccounts}     color="text-sky-400" />
          <StatCard label="Guest Accounts"     value={stats.guestAccounts}     color="text-violet-400" />
          <StatCard label="Suspended"          value={stats.suspendedAccounts} color="text-red-400" />
        </div>
      )}

      {/* Quick: recent pending orders */}
      <div>
        <p className="text-slate-500 text-xs mb-2">Recent Pending Orders</p>
        {orders.filter(o => o.status === 'pending').slice(0, 3).map(o => (
          <div key={o.orderId} className="bg-slate-900 border border-amber-500/20 rounded-xl p-3 mb-2">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 text-xs font-mono">{o.orderId}</span>
              <StatusBadge status={o.status} />
            </div>
            <p className="text-white text-sm mt-1">{o.email}</p>
            <p className="text-slate-500 text-xs">{SUBSCRIPTION_PLANS.find(p => p.id === o.plan)?.nameEn} — ${o.planPrice}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => doAction('approve', () => subscriptionService.approveOrder(o.orderId, adminId))}
                className="flex-1 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/25 transition"
              >
                Approve ✓
              </button>
              <button
                onClick={() => { setTab('orders'); setExpandedOrderId(o.orderId); }}
                className="flex-1 h-8 rounded-lg bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
        {orders.filter(o => o.status === 'pending').length === 0 && (
          <p className="text-slate-600 text-sm text-center py-4">No pending orders 🎉</p>
        )}
      </div>
    </div>
  );

  // ── Render: Users tab ────────────────────────────────────────────────────

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search email / name..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 outline-none"
          />
        </div>
        <button onClick={loadDashboard} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'active', 'registered_trial', 'guest_trial', 'expired', 'suspended'] as const).map(f => (
          <button
            key={f}
            onClick={() => setUserFilter(f)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${userFilter === f ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-600'}`}
          >
            {f === 'all' ? 'All' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <p className="text-slate-600 text-xs">{filteredUsers.length} users</p>

      <div className="space-y-2">
        {filteredUsers.map(u => {
          const expanded = expandedUserId === u.id;
          const isTrialUser = u.accountStatus === 'registered_trial' || u.accountStatus === 'guest_trial';
          const endAt = u.accountStatus === 'active' ? u.subscriptionEndAt : u.trialEndAt;
          return (
            <div key={u.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Row */}
              <button
                onClick={() => setExpandedUserId(expanded ? null : u.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800/50 transition"
              >
                <div className="flex-1 text-right">
                  <p className="text-white text-sm font-medium">{u.email ?? u.name ?? u.id.slice(0, 8)}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {fmtDate(u.createdAt)} · {isTrialUser ? `${daysLeft(endAt)}d trial left` : (u.accountStatus === 'active' ? `${daysLeft(endAt)}d sub left` : '—')}
                  </p>
                </div>
                <StatusBadge status={u.accountStatus} />
                {expanded ? <ChevronUp className="w-4 h-4 text-slate-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-600 flex-shrink-0" />}
              </button>

              {/* Expanded detail */}
              {expanded && (
                <div className="border-t border-slate-800 px-4 py-4 space-y-4">
                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      ['Email', u.email ?? '—'],
                      ['Name', u.name ?? '—'],
                      ['Type', u.type],
                      ['Device ID', u.deviceId ? u.deviceId.slice(0, 12) + '…' : '—'],
                      ['Plan', u.currentPlan ?? '—'],
                      ['Sub Start', fmtDate(u.subscriptionStartAt)],
                      ['Sub End', fmtDate(u.subscriptionEndAt)],
                      ['Trial End', fmtDate(u.trialEndAt)],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-slate-800/50 rounded-lg p-2">
                        <p className="text-slate-500">{k}</p>
                        <p className="text-white font-medium truncate">{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {u.notes && (
                    <div className="bg-slate-800/60 rounded-xl p-3">
                      <p className="text-slate-500 text-xs mb-1">Notes</p>
                      <p className="text-slate-300 text-xs whitespace-pre-wrap">{u.notes}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => doAction('suspend', () => subscriptionService.suspendUser(u.id, adminId))}
                      className="h-9 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-red-500/15 transition"
                    >
                      <UserX className="w-3.5 h-3.5" /> Suspend
                    </button>
                    <button
                      onClick={() => doAction('approve', () => subscriptionService.setUserStatus(u.id, 'active', adminId))}
                      className="h-9 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-emerald-500/15 transition"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => doAction('reset device', () => subscriptionService.resetDeviceBinding(u.id, adminId))}
                      className="h-9 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 hover:bg-slate-700 transition"
                    >
                      <Link className="w-3.5 h-3.5" /> Reset Device
                    </button>
                    <button
                      onClick={() => doAction('extend trial', () => subscriptionService.extendTrial(u.id, 7, adminId))}
                      className="h-9 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-blue-500/15 transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> +7d Trial
                    </button>
                    <button
                      onClick={() => doAction('cancel subscription', () => subscriptionService.cancelSubscription(u.id, adminId))}
                      className="h-9 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-amber-500/15 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancel Sub
                    </button>
                    <button
                      onClick={() => doAction('delete user', () => subscriptionService.deleteUser(u.id, adminId))}
                      className="h-9 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 text-xs font-medium flex items-center justify-center gap-1 hover:bg-red-500/10 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                  {/* Grant subscription */}
                  {grantUserId === u.id ? (
                    <div className="space-y-2">
                      <select
                        value={grantPlan}
                        onChange={e => setGrantPlan(e.target.value as SubscriptionPlan)}
                        className="w-full h-9 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs px-3 outline-none"
                      >
                        {SUBSCRIPTION_PLANS.map(p => (
                          <option key={p.id} value={p.id}>{p.nameEn} (${p.price})</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setGrantUserId(null);
                            doAction('grant subscription', () => subscriptionService.grantSubscription(u.id, grantPlan, adminId));
                          }}
                          className="flex-1 h-9 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
                        >
                          Grant ✓
                        </button>
                        <button
                          onClick={() => setGrantUserId(null)}
                          className="flex-1 h-9 rounded-xl border border-slate-700 text-slate-400 text-xs hover:border-slate-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setGrantUserId(u.id)}
                      className="w-full h-9 rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-violet-500/15 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Grant Subscription
                    </button>
                  )}

                  {/* Add note */}
                  <div className="space-y-2">
                    <textarea
                      value={noteInput[u.id] ?? ''}
                      onChange={e => setNoteInput(prev => ({ ...prev, [u.id]: e.target.value }))}
                      placeholder="Add a note..."
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs placeholder-slate-600 outline-none focus:border-slate-600 resize-none"
                    />
                    <button
                      disabled={!noteInput[u.id]?.trim()}
                      onClick={() => {
                        const note = noteInput[u.id]?.trim();
                        if (!note) return;
                        setNoteInput(prev => ({ ...prev, [u.id]: '' }));
                        doAction('add note', () => subscriptionService.addUserNote(u.id, note, adminId));
                      }}
                      className="w-full h-8 rounded-xl border border-slate-700 text-slate-400 text-xs flex items-center justify-center gap-1 hover:border-slate-600 disabled:opacity-40 transition"
                    >
                      <StickyNote className="w-3 h-3" /> Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredUsers.length === 0 && !loading && (
          <p className="text-slate-600 text-sm text-center py-8">No users found</p>
        )}
      </div>
    </div>
  );

  // ── Render: Orders tab ────────────────────────────────────────────────────

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-xs">{filteredOrders.length} orders</p>
        <button onClick={loadDashboard} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 transition">
          <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'pending', 'approved', 'rejected', 'suspended'] as const).map(f => (
          <button
            key={f}
            onClick={() => setOrderFilter(f)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${orderFilter === f ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-600'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredOrders.map(o => {
          const expanded = expandedOrderId === o.orderId;
          const plan = SUBSCRIPTION_PLANS.find(p => p.id === o.plan);
          return (
            <div key={o.orderId} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Row */}
              <button
                onClick={() => setExpandedOrderId(expanded ? null : o.orderId)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800/50 transition"
              >
                <div className="flex-1 text-right">
                  <p className="text-white text-sm font-medium">{o.email}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{plan?.nameEn} · ${o.planPrice} · {fmtDate(o.createdAt)}</p>
                </div>
                <StatusBadge status={o.status} />
                {expanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Expanded */}
              {expanded && (
                <div className="border-t border-slate-800 px-4 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      ['Order ID', o.orderId],
                      ['User ID', o.userId.slice(0, 12) + '…'],
                      ['Plan', plan?.nameEn ?? o.plan],
                      ['Price', `$${o.planPrice} USD`],
                      ['Method', o.paymentMethod],
                      ['Created', fmtDate(o.createdAt)],
                      ['Processed', fmtDate(o.processedAt)],
                      ['Device', o.deviceId ? o.deviceId.slice(0, 12) + '…' : '—'],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-slate-800/50 rounded-lg p-2">
                        <p className="text-slate-500">{k}</p>
                        <p className="text-white font-medium truncate">{v}</p>
                      </div>
                    ))}
                  </div>

                  {o.adminNote && (
                    <div className="bg-slate-800/60 rounded-xl p-3">
                      <p className="text-slate-500 text-xs mb-1">Admin Note</p>
                      <p className="text-slate-300 text-xs">{o.adminNote}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {o.status !== 'approved' && (
                      <button
                        onClick={() => doAction('approve order', () => subscriptionService.approveOrder(o.orderId, adminId))}
                        className="h-9 col-span-2 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve & Activate
                      </button>
                    )}
                    <button
                      onClick={() => doAction('suspend order', () => subscriptionService.suspendOrder(o.orderId, adminId))}
                      className="h-9 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs flex items-center justify-center gap-1 hover:bg-amber-500/15 transition"
                    >
                      <Pause className="w-3.5 h-3.5" /> Suspend
                    </button>
                    <button
                      onClick={() => doAction('delete order', () => subscriptionService.deleteOrder(o.orderId, adminId))}
                      className="h-9 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs flex items-center justify-center gap-1 hover:bg-red-500/15 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                  {/* Reject with reason */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Reject reason (optional)..."
                      value={rejectReason[o.orderId] ?? ''}
                      onChange={e => setRejectReason(prev => ({ ...prev, [o.orderId]: e.target.value }))}
                      className="w-full h-9 bg-slate-800 border border-slate-700 rounded-xl px-3 text-white text-xs placeholder-slate-600 outline-none focus:border-red-500/50"
                    />
                    <button
                      onClick={() => {
                        const reason = rejectReason[o.orderId] ?? '';
                        setRejectReason(prev => ({ ...prev, [o.orderId]: '' }));
                        doAction('reject order', () => subscriptionService.rejectOrder(o.orderId, adminId, reason));
                      }}
                      className="w-full h-8 rounded-xl border border-red-500/20 text-red-400 text-xs flex items-center justify-center gap-1 hover:bg-red-500/10 transition"
                    >
                      <XCircle className="w-3 h-3" /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredOrders.length === 0 && !loading && (
          <p className="text-slate-600 text-sm text-center py-8">No orders found</p>
        )}
      </div>
    </div>
  );

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-slate-950 flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top, 16px)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
        <button
          onClick={() => navigate('/settings')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">Admin Dashboard</h1>
        <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center">
          <span className="text-violet-400 text-xs font-bold">A</span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-5 mt-3 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-xs">{error}</span>
          <button onClick={() => setError('')} className="ml-auto text-red-400 text-xs">✕</button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-6">
          <RefreshCw className="w-5 h-5 text-slate-500 animate-spin" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-4">
        {tab === 'dashboard' && renderDashboard()}
        {tab === 'users'     && renderUsers()}
        {tab === 'orders'    && renderOrders()}
      </div>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 flex" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {([
          { id: 'dashboard', label: 'Dashboard', Icon: BarChart2 },
          { id: 'users',     label: 'Users',     Icon: Users },
          { id: 'orders',    label: 'Orders',    Icon: ShoppingBag },
        ] as const).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition ${tab === id ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
