// プロジェクトデータ
const projects = {
    1: {
        title: 'itinerant tea room',
        location: 'Tokyo, Japan',
        year: '2021',
        type: 'Commercial',
        description: '全国を旅しながら喫茶店を営んできた店主のための拠点',
        image: 'assets/cafe-interior.png'
    },
    2: {
        title: '区立公園',
        location: 'Tokyo, Japan',
        year: '2024',
        type: 'Public',
        description: '丘のようなゆるやかな境界より多様な人が共存できる公園',
        image: 'assets/kuritsu-koen.png'
    },
    3: {
        title: 'Bistrot OJI',
        location: 'Tokyo, Japan',
        year: '2024',
        type: 'Commercial',
        description: 'モダンなビストロ空間の洗練されたインテリアデザイン',
        image: 'assets/bistrot-oji.png'
    },
    4: {
        title: 'bubble garden',
        location: 'Tokyo, Japan',
        year: '2023',
        type: 'Landscape',
        description: 'モダンなランドスケープデザインによる庭園空間',
        image: 'assets/bubble-garden.png'
    },
    5: {
        title: '内之浦の家',
        location: 'Tokyo, Japan',
        year: '2023',
        type: 'Residential',
        description: '伝統的な日本建築の美しさと現代的な機能性を融合した住宅',
        image: 'assets/uchinoura-house.png'
    },
    6: {
        title: 'Linear Village',
        location: 'Tokyo, Japan',
        year: '2023',
        type: 'Residential',
        description: '線形に配置された住居群が緑豊かな環境と調和し、新しい村落コミュニティを形成する住宅プロジェクト',
        image: 'assets/linear-village.png'
    },
    7: {
        title: 'sisui',
        location: 'Tokyo, Japan',
        year: '2021',
        type: 'Product Design',
        description: 'アウトドア空間での共食をコンセプトとした家具デザイン。屋外でも快適に使用できる機能性と美しさを兼ね備えたテーブルとチェアセット',
        image: 'assets/sisui.png'
    }
};

// 現在のビュー
let currentView = 'works';

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションの初期化
    showView('works');
    
    // プロジェクトクリックイベントの設定
    setupProjectEvents();
    
    // モーダルクリックイベントの設定
    setupModalEvents();
});

// ビューの切り替え
function showView(viewName) {
    // 全てのビューを非表示
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    // 指定されたビューを表示
    const targetView = document.getElementById(viewName + '-view');
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // ナビゲーションの更新
    updateNavigation(viewName);
    
    currentView = viewName;
}

// ナビゲーションの更新
function updateNavigation(activeView) {
    // デスクトップナビゲーション
    const desktopNavItems = document.querySelectorAll('.nav-item');
    desktopNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === activeView) {
            item.classList.add('active');
        }
    });
    
    // モバイルナビゲーション
    const mobileNavItems = document.querySelectorAll('.nav-item-mobile');
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === activeView) {
            item.classList.add('active');
        }
    });
}

// プロジェクトイベントの設定
function setupProjectEvents() {
    const projectElements = document.querySelectorAll('.project');
    
    projectElements.forEach(project => {
        const projectId = project.getAttribute('data-project');
        const images = project.querySelectorAll('.project-img, .project-plan');
        const title = project.querySelector('.project-title');
        
        // 画像クリックイベント
        images.forEach(img => {
            img.addEventListener('click', () => openModal(projectId));
        });
        
        // タイトルクリックイベント
        if (title) {
            title.addEventListener('click', () => openModal(projectId));
        }
    });
}

// モーダルイベントの設定
function setupModalEvents() {
    const modal = document.getElementById('project-modal');
    
    // モーダル背景クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// モーダルを開く
function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLocation = document.getElementById('modal-location');
    const modalYear = document.getElementById('modal-year');
    const modalType = document.getElementById('modal-type');
    
    // モーダルコンテンツを更新
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalLocation.textContent = `Location: ${project.location}`;
    modalYear.textContent = `Year: ${project.year}`;
    modalType.textContent = `Type: ${project.type}`;
    
    // モーダルを表示
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// スムーススクロール（アンカーリンクがある場合）
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// 画像の遅延読み込み（オプション）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// レスポンシブ対応のためのリサイズイベント
window.addEventListener('resize', function() {
    // 必要に応じてレイアウト調整
});

// パフォーマンス最適化のためのスクロールイベント
let ticking = false;

function updateOnScroll() {
    // スクロールに応じた処理があれば記述
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});
