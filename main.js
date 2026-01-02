
function shakeWindow() {
  document.body.classList.add('shake-window');
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('shake-window');
  }, { once: true });
}

document.querySelectorAll('.clickable').forEach(card => {
  card.addEventListener('click', () => {
    shakeWindow();
    card.classList.add('shake');
    card.addEventListener('animationend', () => {
      card.classList.remove('shake');
    }, { once: true });
  });
});

document.addEventListener('click', (e) => {
  const effect = document.createElement('div');
  effect.classList.add('click-effect');
  effect.style.left = `${e.clientX}px`;
  effect.style.top = `${e.clientY}px`;

  document.body.appendChild(effect);

  effect.addEventListener('animationend', () => {
    effect.remove();
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll(".filter-check");
  const cards = document.querySelectorAll(".work-card");

  function applyFilter() {
    // ON になっているチェックボックスの value を配列で取得
    const activeFilters = [...checks]
      .filter(ch => ch.checked)
      .map(ch => ch.value);

    // 何も選択されていない → 全表示
    if (activeFilters.length === 0) {
      cards.forEach(card => card.classList.remove("hidden"));
      return;
    }

    cards.forEach(card => {
      const tags = [...card.querySelectorAll(".work-tag")];

      // AND 条件：すべての activeFilters を持っているか？
      const match = activeFilters.every(filter =>
        tags.some(tag => tag.classList.contains(filter))
      );

      if (match) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  // チェックボックスが変わるたびにフィルタ適用
  checks.forEach(ch => ch.addEventListener("change", applyFilter));
});


 
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".play-button");
 
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const wrapper = btn.parentElement;
      const toast = wrapper.querySelector(".play-toast");
 
      if (!toast) return; // toast がないカードは何もしない
 
      btn.style.opacity = "0";     // ボタンを消す
      toast.classList.add("show"); // toast を表示
 
      setTimeout(() => {
        toast.classList.remove("show");
        btn.style.opacity = "1";   // ボタンを戻す
      }, 3000);
    });
  });
});


document.querySelectorAll('.movie-play-button').forEach(button => {
    button.addEventListener('click', async () => {

        // 親要素（.work-thumb-wrapper）
        const wrapper = button.parentElement;

        // サムネ画像を取得
        const thumb = wrapper.querySelector('.work-thumb');
        if (!thumb) return;

        // data-video を取得
        const videoSrc = thumb.dataset.video;
        if (!videoSrc) return;

        // video-container を取得
        const container = wrapper.querySelector('.video-container');
        if (!container) return;


        // すでに動画がある場合は再生するだけ
        if (container.querySelector('video') || container.querySelector('iframe')) {
            return;
        }

        // YouTubeリンクかどうか判定
        if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
            // サムネを非表示
            thumb.style.display = 'none';
            button.style.display = 'none';

            // YouTube埋め込みURLに変換
            const embedUrl = convertToYouTubeEmbed(videoSrc);

            const iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            container.appendChild(iframe);
        } else {
            // 通常のMP4動画

            // ▼ ローカル動画の存在チェック
            const exists = await checkFileExists(videoSrc);
            if (!exists) {
                console.warn(`File not found: ${videoSrc}`);
                return; // ← 処理しない
            }

            // サムネを非表示
            thumb.style.display = 'none';
            button.style.display = 'none';
            

            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            container.appendChild(video);
        }
    });
});

// ▼ ファイル存在チェック関数
async function checkFileExists(url) {
    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok;
    } catch (e) {
        return false;
    }
}

// YouTube URL → 埋め込みURLに変換
function convertToYouTubeEmbed(url) {
    let id = "";

    if (url.includes("watch?v=")) {
        id = url.split("watch?v=")[1];
    } else if (url.includes("youtu.be/")) {
        id = url.split("youtu.be/")[1];
    }

    const origin = window.location.origin; // ローカルサーバーでも有効

    return `https://www.youtube.com/embed/${id}?autoplay=1&origin=${origin}`;
}