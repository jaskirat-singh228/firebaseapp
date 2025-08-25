package com.firebaseapp.nativemodules

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext

class NativeToastModule(reactContext: ReactApplicationContext) : NativeToastSpec(reactContext) {
    override fun getName() = NAME

    override fun NativeToast(message: String?) {
        Toast.makeText(reactApplicationContext,message,Toast.LENGTH_LONG).show()
    }

    companion object {
        const val NAME = "NativeToast"
    }
}