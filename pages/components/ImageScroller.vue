<template>
  <h1>スクロールテスト</h1>
  <div class="horizontal-scroll-container">
    <div class="image-wrapper" v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="image.alt" class="scroll-image" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 表示したい画像のリストを定義します。
// 実際にはAPIから取得したり、propsとして親コンポーネントから渡したりすることも可能です。
const images = ref([
  { src: 'https://source.unsplash.com/random/300x200?sig=1', alt: 'ランダムな画像1' },
  { src: 'https://source.unsplash.com/random/300x200?sig=2', alt: 'ランダムな画像2' },
  { src: 'https://source.unsplash.com/random/300x200?sig=3', alt: 'ランダムな画像3' },
  { src: 'https://source.unsplash.com/random/300x200?sig=4', alt: 'ランダムな画像4' },
  { src: 'https://source.unsplash.com/random/300x200?sig=5', alt: 'ランダムな画像5' },
  { src: 'https://source.unsplash.com/random/300x200?sig=6', alt: 'ランダムな画像6' },
  { src: 'https://source.unsplash.com/random/300x200?sig=7', alt: 'ランダムな画像7' },
  { src: 'https://source.unsplash.com/random/300x200?sig=8', alt: 'ランダムな画像8' },
]);
</script>

<style scoped>
.horizontal-scroll-container {
  display: flex; /* 子要素を横並びにする */
  overflow-x: auto; /* 横方向のスクロールを可能にする */
  padding: 16px; /* コンテナの内側に余白を持たせる */
  gap: 16px; /* 画像と画像の間に隙間を作る */
  -webkit-overflow-scrolling: touch; /* iOSでのスムーズなスクロールを有効にする */
  scrollbar-width: thin; /* スクロールバーの幅を細くする (Firefox) */
  scrollbar-color: #888 #f1f1f1; /* スクロールバーの色を指定する (Firefox) */
}

/* Webkit系ブラウザ (Chrome, Safari) のスクロールバーのスタイル */
.horizontal-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.horizontal-scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.image-wrapper {
  flex: 0 0 auto; /* 画像が縮まないようにする */
}

.scroll-image {
  width: 300px; /* 画像の幅を固定 */
  height: 200px; /* 画像の高さを固定 */
  object-fit: cover; /* 画像のアスペクト比を保ちつつ、指定したサイズに合わせてトリミング */
  border-radius: 8px; /* 画像の角を丸くする */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 画像に影を付けて立体感を出す */
}
</style>