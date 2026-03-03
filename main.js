const supabaseUrl = 'https://sereexsifpgpgbhmcdqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcmVleHNpZnBncGdiaG1jZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzgwNjcsImV4cCI6MjA4ODAxNDA2N30.6DOdcwdqyu24LaXL96iP9bLfaFnz-B2bsCbFN1aYFqs';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

function changeImage(index) {
    for (let i = 1; i <= 4; i++) {
        const img = document.getElementById(`main-${i}`);
        const label = document.querySelector(`label[onclick="changeImage(${i})"]`);
        if (img) img.style.display = (i === index) ? 'block' : 'none';
        if (label) label.style.borderColor = (i === index) ? '#0f172a' : 'transparent';
    }
}

async function loadProductData() {
    const { data, error } = await _supabase.from('Products').select('*').limit(1).single();
    if (error) return console.error('Supabase Error:', error);

    if (data) {
        // 1. 主图与缩略图
        for (let i = 1; i <= 4; i++) {
            const url = data[`image_${i}`];
            if (url) {
                document.getElementById(`main-${i}`).src = url;
                document.getElementById(`thumb-${i}`).src = url;
            }
        }

        // 2. 6大功能 (确认数据库字段名：feature_img_1, feature_text_1...)
        for (let i = 1; i <= 6; i++) {
            const fImg = document.getElementById(`feature-img-${i}`);
            const fText = document.getElementById(`feature-text-${i}`);
            if (fImg && data[`feature_img_${i}`]) fImg.src = data[`feature_img_${i}`];
            if (fText && data[`feature_text_${i}`]) fText.innerText = data[`feature_text_${i}`];
        }

        // 3. 成分与反馈
        if (data.ing_main) document.getElementById('ing-main').src = data.ing_main;
        if (data.ing_icon_1) document.getElementById('ing-icon-1').src = data.ing_icon_1;
        if (data.ing_desc_1) document.getElementById('ing-desc-1').innerText = data.ing_desc_1;
        if (data.testi_img_1) document.getElementById('testi-1').src = data.testi_img_1;
        if (data.testi_img_2) document.getElementById('testi-2').src = data.testi_img_2;

        // 4. Logo、描述、价格
        if (data.logo_url) document.getElementById('site-logo').src = data.logo_url;
        document.getElementById('prod-desc').innerText = data.description || "";
        document.getElementById('price-tag').innerText = `RM ${data.price || "0"}`;
        
        // 5. WhatsApp
        const waLink = document.getElementById('wa-link');
        waLink.href = `https://wa.me/${data.wa_number || '60126420820'}?text=Hi, 我想买 ${data.name || '这款产品'}`;

        changeImage(1); // 初始化显示
    }
}

window.addEventListener('load', loadProductData);
