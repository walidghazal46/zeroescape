package com.example.zeroescape;

import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        // Bridge to allow JS to interact with Android
        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void exitApp() {
                finish();
            }
        }, "Android");

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        webView.setWebViewClient(new WebViewClient() {
            @Override
            @Nullable
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
            
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Notify the app it's running on Android
                webView.evaluateJavascript("window.isAndroid = true;", null);
            }
        });

        // Use the virtual domain to load assets and bypass CORS
        webView.loadUrl("https://appassets.androidplatform.net/assets/index.html");

        setContentView(webView);
    }

    @Override
    public void onBackPressed() {
        // Delegate back press to React app logic
        webView.evaluateJavascript(
            "(function() { " +
            "  if (window.onAndroidBack) { " +
            "    window.onAndroidBack(); " +
            "  } else if (window.history.length > 1) { " +
            "    window.history.back(); " +
            "  } else { " +
            "    Android.exitApp(); " +
            "  } " +
            "})();", 
            null
        );
    }
}
