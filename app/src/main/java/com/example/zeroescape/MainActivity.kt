package com.example.zeroescape

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val webView = WebView(this)
        webView.settings.javaScriptEnabled = true
        webView.webViewClient = WebViewClient()
        
        // Pointing to localhost for development or a hosted URL. 
        // For a real app, you'd package the assets or use a production URL.
        webView.loadUrl("https://zeroescape-no-1.web.app") // Placeholder URL based on project name
        
        setContentView(webView)
    }
}
