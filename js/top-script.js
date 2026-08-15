document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('works-content');

  // 要素が存在しない場合は処理をスキップ
  if (!container) return;

  // 1. 描画前に必ず中身を一度「完全な空（クリア）」にする！
  container.innerHTML = '';

  fetch('works.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        // 画像が存在しない場合の崩れ防止処理
        const thumbSrc = item.mainThumb ? item.mainThumb : 'img/no-image.png';

        const html = `
          <div class="works-wrap">
              <a href="works-detail.html?id=${item.id}">
                  <img src="${thumbSrc}" alt="${item.title}">
                  <h4>${item.title}</h4>
                  <p>${item.category}</p>
              </a>
          </div>
        `;
        // HTMLに追加
        container.insertAdjacentHTML('beforeend', html);
      });
    })
    .catch(error => console.error('トップページの読み込みエラー:', error));
});