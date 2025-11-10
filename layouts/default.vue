<template>
  <div class="site-container">
    <header class="site-header">
      <h1>WebViewテスト用サイト</h1>
      <nav>
        <NuxtLink to="/">トップ</NuxtLink>
        <NuxtLink to="/test">テスト</NuxtLink>
      </nav>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer class="site-footer">
      <p>&copy; 2025 私のテスト用サイト. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<style>
/* 簡単なスタイルを当ててみましょう */
body {
  font-family: sans-serif;
  margin: 0;
}
.site-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.site-header {
  background-color: #f1f1f1;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
.site-header nav a {
  margin-right: 1rem;
}
main {
  flex-grow: 1; /* フッターを一番下に押しやる */
  padding: 1rem;
}
.site-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>