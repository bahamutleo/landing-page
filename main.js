const supabaseUrl = 'https://sereexsifpgpgbhmcdqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcmVleHNpZnBncGdiaG1jZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzgwNjcsImV4cCI6MjA4ODAxNDA2N30.6DOdcwdqyu24LaXL96iP9bLfaFnz-B2bsCbFN1aYFqs';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- [核心修复] 用于管理图片切换和高亮的 JS 函数 ---
function changeImage(index) {
    // 1. 隐藏所有大图
    for (let i = 1; i <= 4; i++) {
        const img = document.getElementById(`main-${i}`);
        if (img) img.style.display = 'none'; // 行内样式隐藏

        // 2. 取消所有缩略图标签的高亮边框 (使用选择器找到 label)
        const thumbLabel = document.querySelector(`label[onclick="changeImage(${i})"]`);
        if (thumbLabel) thumbLabel.style.borderColor = 'transparent';
    }

    // 3. 显示当前点击的大图
    const activeImg = document.getElementById(`main-${index}`);
    // 增加容错：确保图片src不是undefined
    if (activeImg && activeImg.src && !activeImg.src.includes('undefined')) {
        activeImg.style.display = 'block'; // 行内样式显示

        // 4. 给当前缩略图标签加上黑色高亮边框
        const activeLabel = document.querySelector(`label[onclick="changeImage(${index})"]`);
        if (activeLabel) activeLabel.style.borderColor = '#0f172a'; // slate-900
    }
}

async function loadProductData() {
    console.log("正在尝试从 Supabase 读取数据...");
    const { data, error } = await _supabase.from('Products').select('*').limit(1).single();

    if (error) {
        console.error('读取失败:', error);
        return;
    }

    if (data) {
        console.log('成功拿到数据:', data);

        // --- 1. 加载 4 张展示图 ---
        for (let i = 1; i <= 4; i++) {
            const imageUrl = data[`image_${i}`]; // 对应数据库字段 image_1, image_2...
            const mainImg = document.getElementById(`main-${i}`);
            const thumbImg = document.getElementById(`thumb-${i}`);
            
            if (imageUrl && imageUrl !== null) {
                if (mainImg) mainImg.src = imageUrl;
                if (thumbImg) thumbImg.src = imageUrl;
            } else {
                // 如果数据库没图，隐藏对应的缩略图
                const thumbLabel = document.querySelector(`label[onclick="changeImage(${i})"]`);
                if (thumbLabel) thumbLabel.style.display = 'none';
            }
        }

        // --- 2. 新增：加载 6 大核心功能 ---
        for (let i = 1; i <= 6; i++) {
            const fImg = document.getElementById(`feature-img-${i}`);
            const fText = document.getElementById(`feature-text-${i}`);
            const imgUrlFromDb = data[`feature_img_${i}`];
            const textContentFromDb = data[`feature_text_${i}`];

            if (fImg && imgUrlFromDb) fImg.src = imgUrlFromDb;
            if (fText && textContentFromDb) fText.innerText = textContentFromDb;
        }

        // --- 3. 新增：加载 Logo ---
        const logoImg = document.getElementById('site-logo');
        if (logoImg && data.logo_url) {
            logoImg.src = data.logo_url;
        }

        // --- 4. 原有加载逻辑 (价格、描述、WhatsApp) ---
        if (document.getElementById('prod-desc')) document.getElementById('prod-desc').innerText = data.description;
        const priceElement = document.querySelector('.text-lg.font-black');
        if (priceElement) priceElement.innerText = `RM ${data.price}`;
        
        const waBtn = document.querySelector('a[href^="https://wa.me"]');
        if (waBtn) {
            waBtn.href = `https://wa.me/${data.wa_number || '60126420820'}?text=${encodeURIComponent('Hi, 我想买 ' + (data.name || '这款产品'))}`;
        }

        // --- 初始化显示：加载完成后，默认激活第一张大图 ---
        changeImage(1);
    }
}

window.addEventListener('load', loadProductData);
