document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const welcomeTextContainer = document.getElementById('welcome-text');
    
    const textContent = welcomeTextContainer.textContent;
    welcomeTextContainer.textContent = ''; // 元のテキストをクリア
    
    // --- 1. テキストを一文字ずつ<span>で囲む処理 ---
    // テキストを一文字ずつに分割し、<span>で囲んでコンテナに戻す
    const chars = textContent.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // スペースも残す
        span.classList.add('char');
        welcomeTextContainer.appendChild(span);
        return span;
    });

    // --- 2. 順番に文字を表示するアニメーション ---
    
    let delay = 0; // 遅延時間の初期値 (ミリ秒)
    const charInterval = 70; // 一文字あたりの表示間隔 (70ミリ秒)

    chars.forEach((char, index) => {
        // 各文字に対して、インデックス * 間隔 の分だけ遅延させて 'is-visible' クラスを付与
        setTimeout(() => {
            char.classList.add('is-visible');
        }, delay);
        
        delay += charInterval;
    });

    // --- 3. 全体が消えるタイミングの制御 ---
    
    const totalCharDisplayTime = chars.length * charInterval; // 全文字が表示完了するまでの時間
    const holdTime = 1000; // 全文字が表示された後、保持する時間 (1秒)
    const fadeDuration = 1000; // フェードアウトにかかる時間 (1秒)
    
    // フェードアウト開始までの時間 = (全文字表示時間) + (保持時間)
    const fadeOutStartTime = totalCharDisplayTime + holdTime;

    // A. フェードアウト開始
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
    }, fadeOutStartTime);

    // B. アニメーション完了後、要素を完全に非表示にする
    setTimeout(() => {
        splashScreen.classList.add('hidden');
    }, fadeOutStartTime + fadeDuration);
});

// topボタン
$(function(){
    const topButton = $('.pagetop')
    
    $(window).on('scroll', function() {
        const scrollValue = $(this).scrollTop();
        if ( scrollValue > 500 ) {
            topButton.addClass('fadein')
        } else { ( scrollValue < 500 ) 
            topButton.removeClass('fadein')
        }
    })
})

// ハンバーガーメニュー
const $headerNavbtn = $('.header-navbtn')
const $headerNav = $('.header-nav')

$headerNavbtn.on('click', function(){
    $headerNav.fadeToggle();
    $(this).toggleClass('active')
})

$(window).on('resize', function(){
    const windowWidth = $(window).outerWidth();

    if(windowWidth <= 768 ){
        $headerNav.hide();
        $headerNavbtn.removeClass('active');
    } else {
        $headerNav.show();
    }
});

