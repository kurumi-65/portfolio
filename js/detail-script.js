document.addEventListener('DOMContentLoaded', () => {
  // 1. URLから「?id=〇〇」を取得
  const urlParams = new URLSearchParams(window.location.search);
  const workId = urlParams.get('id');

  if (!workId) {
    window.location.href = 'index.html';
    return;
  }

  // 2. 汎用関数: 値があれば表示、無ければ非表示（要素および直前のh4見出しごと）
  const setElementContent = (id, value, isHtml = false) => {
    const el = document.getElementById(id);
    if (!el) return;

    // 前の見出し（h4等）を取得
    const heading = el.previousElementSibling && el.previousElementSibling.tagName.startsWith('H')
      ? el.previousElementSibling
      : null;

    // value が undefined / null / 空文字 でないか安全にチェック
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      if (isHtml) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
      el.style.display = '';
      if (heading) heading.style.display = '';
    } else {
      // データがない場合は要素と見出しの両方を確実に隠す
      el.textContent = '';
      el.style.display = 'none';
      if (heading) heading.style.display = 'none';
    }
  };

  // リスト（ul/li）用の表示・非表示関数
  const renderList = (ulId, listData) => {
    const ul = document.getElementById(ulId);
    if (!ul) return;

    const heading = ul.previousElementSibling && ul.previousElementSibling.tagName.startsWith('H') 
      ? ul.previousElementSibling 
      : null;

    if (listData && Array.isArray(listData) && listData.length > 0) {
      ul.innerHTML = '';
      listData.forEach(text => {
        const li = document.createElement('li');
        li.innerHTML = text;
        ul.appendChild(li);
      });
      ul.style.display = '';
      if (heading) heading.style.display = '';
    } else {
      ul.innerHTML = '';
      ul.style.display = 'none';
      if (heading) heading.style.display = 'none';
    }
  };

  // 画像用の表示・非表示関数
  const setImage = (imgId, src, alt) => {
    const img = document.getElementById(imgId);
    if (!img) return;

    if (src && String(src).trim() !== '') {
      img.src = src;
      img.alt = alt || '';
      img.style.display = '';
      // 親要素（.viewport-img 等）に画像が1枚も無ければ枠ごと隠す配慮
    } else {
      img.style.display = 'none';
    }
  };

  // 3. JSONデータの取得と反映
  fetch('works.json')
    .then(response => response.json())
    .then(data => {
      const workData = data.find(item => item.id === workId);

      if (workData) {
        // テキスト項目のセット（データが無ければ h4 見出しごと消えます）
        setElementContent('detail-main-title', workData.mainTitle, true);
        setElementContent('detail-title', workData.title);
        setElementContent('detail-category', workData.category);
        setElementContent('detail-concept', workData.concept, true);
        setElementContent('detail-tools', workData.tools, true);
        setElementContent('detail-period', workData.period);
        setElementContent('detail-size', workData.size); 
        setElementContent('detail-place', workData.place);

        // 画像のセット（無い場合は自動非表示）
        setImage('detail-main-thumb', workData.mainThumb, workData.title);
        setImage('detail-pc-img', workData.pcImg, 'PCキャプチャ');
        setImage('detail-sp-img', workData.spImg, 'SPキャプチャ');

        // PC/SP画像エリア全体の判定
        const viewportImgContainer = document.querySelector('.viewport-img');
        
        // products-comment 要素を取得
        const productsComment = document.querySelector('.products-comment');

        if (!workData.pcImg && !workData.spImg) {
          // 画像枠を隠す
          if (viewportImgContainer) viewportImgContainer.style.display = 'none';
          
          // 画像がない場合：.products-comment に no-image クラスを付与
          if (productsComment) productsComment.classList.add('no-image');
        } else {
          if (viewportImgContainer) viewportImgContainer.style.display = '';
          if (productsComment) productsComment.classList.remove('no-image');
        }

        // リスト項目のセット
        renderList('detail-purpose', workData.purpose);
        renderList('detail-target', workData.target);
        renderList('detail-points', workData.points);

        // 実際のサイトへのリンクボタン
        const linkBtn = document.getElementById('site-link');
        if (linkBtn) {
          if (workData.siteUrl && workData.siteUrl.trim() !== '') {
            linkBtn.href = workData.siteUrl;
            if (linkBtn.parentElement) linkBtn.parentElement.style.display = '';
          } else {
            if (linkBtn.parentElement) linkBtn.parentElement.style.display = 'none';
          }
        }

      } else {
        document.querySelector('main').innerHTML = '<p style="text-align:center; padding:50px;">該当する作品が見つかりませんでした。</p>';
      }
    })
    .catch(error => {
      console.error('JSON読み込みエラー:', error);
    });
});