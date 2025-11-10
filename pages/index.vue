<template>
  <div>
    <h2>Nuxt.js (WebView)</h2>
    <p>
      Flutterから受信したメッセージ: <strong>{{ messageFromFlutter }}</strong>
    </p>

    <button @click="sendMessageToFlutter">
      Flutterへメッセージを送信
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// --- 1. Flutterからのメッセージ受信 ---

// 受信したメッセージを保持するref
const messageFromFlutter = ref('まだ受信していません');

/**
 * Flutterからメッセージを受信したときの処理
 * (この関数名はグローバルである必要がなくなりました)
 */
const handleMessageFromFlutter = (message: string) => {
  console.log('Flutterからメッセージを受信:', message);
  try {
    const data = JSON.parse(message);
    messageFromFlutter.value = `[${data.type}] ${data.payload}`;
  } catch (e) {
    messageFromFlutter.value = message;
  }
};


// --- 2. Flutterへのメッセージ送信 ---

/**
 * Flutterへデータを送信する関数
 */
const sendMessageToFlutter = () => {
  // 'myMessager' は Flutter側で addWebMessageListener に指定した `jsObjectName` です
  if (window.myMessager) {
    const data = {
      source: 'Nuxt.js',
      message: 'こんにちは、Flutter！',
      timestamp: new Date().toISOString(),
    };
    
    // オブジェクトはJSON文字列にシリアライズして送信します
    window.myMessager.postMessage(JSON.stringify(data));
    console.log('Flutterへメッセージを送信:', data);

  } else {
    console.error('window.myMessager が見つかりません。');
    // 開発中のデバッグ用にアラートを出す
    alert('Flutterのメッセージリスナー(myMessager)が初期化されていません。');
  }
};


// --- 3. 初期化処理 ---

// Nuxt.jsでは `window` オブジェクトはクライアントサイドでのみアクセス可能です
// `onMounted` ライフサイクルフック内で初期化処理を行います
onMounted(() => {
  // ★ 変更点：グローバル関数登録の代わりに、標準の 'message' イベントをリッスン
  window.addEventListener('message', (event) => {
    // (オプション) event.origin をチェックして、信頼できる送信元か確認
    console.log('message イベントを受信:', event.origin, event.data);
    
    // event.data にFlutterから送られたデータが入っている
    if (event.data) {
      handleMessageFromFlutter(event.data + ' ' + event.origin);
    }
  });

  window.addEventListener('flutterInAppWebViewPlatformReady', (event) => {
    console.log('InAppWebView プラットフォーム準備完了');
  });
});

// --- TypeScriptの型定義 (任意) ---
// グローバルな `window` オブジェクトに型を定義しておくと開発がスムーズです
declare global {
  interface Window {
    // Web -> Flutter (postMessage) 用のオブジェクト
    myMessager?: {
      postMessage: (message: string) => void;
    };
    // Flutter -> Web 受信用の関数
    handleMessageFromFlutter?: (message: string) => void;
  }
}
</script>

<style scoped>
/* コンポーネントのスタイル */
div {
  padding: 20px;
  font-family: sans-serif;
  border: 2px solid #00DC82; /* Nuxt green */
  border-radius: 8px;
}
button {
  margin-top: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>