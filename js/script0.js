$(function () {

    // ★トップに戻るボタンの表示非表示切り替え

    // トップに戻るボタンを隠しておく
    $(".to-top").hide();

    // ブラウザがスクロールされたら処理を実行
    $(window).on("scroll", function () {
        // 画面幅によってスクロール表示位置を変える
        // スマホ（768px未満）は300px以上で表示、PCは500px
        let threshold = $(window).width() < 768 ? 300 : 500;

        if ($(window).scrollTop() > threshold) {
            $(".to-top").fadeIn(500);
        } else {
            $(".to-top").fadeOut(500);
        }
    });

    // ★トップに戻るボタンクリックした時の処理
    $(".to-top a").on("click", function () {
        $("html,body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    // ★ナビゲーションの現在地表示
    const navLinks = document.querySelectorAll('nav ul li p a');
    const currentPath = location.pathname.replace(/\/$/, '');

    navLinks.forEach(link => {
        const linkPath = new URL(link.getAttribute('href'), location.href).pathname.replace(/\/$/, '');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // ★カテゴリ導線のホバー処理

    const categoryItems = document.querySelectorAll('.category-item');
    const categoryDetail = document.getElementById('categoryDetail');
    const categoryDetailContent = document.getElementById('categoryDetailContent');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDesc = document.getElementById('categoryDesc');
    const categoryBtn = document.getElementById('categoryBtn');

    // 枠画像のフィルターマップ（btnColorをキーにカラーフィルターを対応させる）
    const filterMap = {
        '#EF9F27': 'sepia(1) saturate(5) hue-rotate(5deg)',   // グルメ：オレンジ
        '#1D9E75': 'sepia(1) saturate(5) hue-rotate(115deg)',  // マッサージ：グリーン
        '#7F77DD': 'sepia(1) saturate(5) hue-rotate(220deg)',  // パワースポット：パープル
    };

    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // activeクラスを付け替え
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const { img, title, desc, href, bg, btnColor } = item.dataset;

                // 一旦マッサージクラスを外す
                categoryDetailContent.classList.remove('massage');

                // マッサージの時だけ右寄せ
                if (title === 'マッサージ') {
                    categoryDetailContent.classList.add('massage');
                }

                // テキストをフェードアウト
                categoryDetailContent.style.opacity = '0';
                categoryDetailContent.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    // 背景画像を切り替え
                    categoryDetail.style.backgroundImage = `url(${img})`;
                    categoryDetail.style.backgroundSize = 'cover';
                    categoryDetail.style.backgroundPosition = 'center';

                    // カラーオーバーレイを切り替え
                    categoryDetail.style.setProperty('--overlay-color', bg);

                    // 枠のフィルターをカテゴリカラーに合わせて切り替え
                    categoryDetail.style.setProperty('--frame-filter', filterMap[btnColor] || 'none');

                    // テキストを更新（写真の上なので常に白）
                    categoryTitle.textContent = title;
                    categoryTitle.style.color = '#fff';
                    categoryDesc.innerHTML = desc;
                    categoryDesc.style.color = 'rgba(255,255,255,0.9)';
                    categoryBtn.style.borderColor = '#fff';
                    categoryBtn.style.color = '#fff';
                    categoryBtn.href = href;

                    // ボタンのホバー処理
                    categoryBtn.onmouseenter = () => {
                        categoryBtn.style.background = btnColor;
                        categoryBtn.style.color = '#fff';
                    };
                    categoryBtn.onmouseleave = () => {
                        categoryBtn.style.background = 'transparent';
                        categoryBtn.style.color = '#fff';
                    };

                    // テキストをフェードイン
                    categoryDetailContent.style.opacity = '1';
                    categoryDetailContent.style.transform = 'translateY(0)';
                }, 150);
            });
        });
    }

    // ★お知らせバーの切り替え処理
    const noticeMsgs = document.querySelectorAll('.notice-msg');
    const noticeDots = document.querySelectorAll('.notice-dot');

    if (noticeMsgs.length > 0) {
        let noticeCurrent = 0;
        setInterval(() => {
            noticeMsgs[noticeCurrent].classList.remove('active');
            noticeDots[noticeCurrent].classList.remove('active');
            noticeCurrent = (noticeCurrent + 1) % noticeMsgs.length;
            noticeMsgs[noticeCurrent].classList.add('active');
            noticeDots[noticeCurrent].classList.add('active');
        }, 3000);
    }
});