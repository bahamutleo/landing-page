const supabaseUrl = 'https://sereexsifpgpgbhmcdqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcmVleHNpZnBncGdiaG1jZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzgwNjcsImV4cCI6MjA4ODAxNDA2N30.6DOdcwdqyu24LaXL96iP9bLfaFnz-B2bsCbFN1aYFqs';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

function changeImage(index) {
  for (let i = 1; i <= 4; i++) {
    const img = document.getElementById(`main-${i}`);
    if (img) img.style.display = 'none';
    const thumbLabel = document.querySelector(`label[onclick="changeImage(${i})"]`);
    if (thumbLabel) thumbLabel.style.borderColor = 'transparent';
  }
  const activeImg = document.getElementById(`main-${index}`);
  if (activeImg && activeImg.src && !activeImg.src.includes('undefined')) {
    activeImg.style.display = 'block';
    activeImg.style.objectFit = 'cover';
  }
  const activeLabel = document.querySelector(`label[onclick="changeImage(${index})"]`);
  if (activeLabel) activeLabel.style.borderColor = '#0f172a';
}

async function loadProductData() {
  const { data, error } = await _supabase.from('Products').select('*').limit(1).single();
  if (error) return console.error('读取失败:', error);

  if (data) {
    // 1. 展示图
    for (let i = 1; i <= 4; i++) {
      const url = data[`image_${i}`];
      if (url) {
        document.getElementById(`main-${i}`).src = url;
        document.getElementById(`thumb-${i}`).src = url;
      }

      // --- 6. 加载 Logo ---
  const logoImg = document.getElementById('site-logo');
  if (logoImg && data.logo_url) {
      logoImg.src = data.logo_url;
  } else if (logoImg) {
      // 如果数据库没填链接，可以设置一个默认占位图或者隐藏
      logoImg.alt = "Brand Logo";
  }
      
    }
    // 2. 6大功能
    for (let i = 1; i <= 6; i++) {
      if (data[`feature_img_${i}`]) document.getElementById(`feature-img-${i}`).src = data[`feature_img_${i}`];
      if (data[`feature_text_${i}`]) document.getElementById(`feature-text-${i}`).innerText = data[`feature_text_${i}`];
    }
    // 3. 成分与反馈
    if (data.ing_main) document.getElementById('ing-main').src = data.ing_main;
    if (data.ing_icon_1) document.getElementById('ing-icon-1').src = data.ing_icon_1;
    if (data.ing_desc_1) document.getElementById('ing-desc-1').innerText = data.ing_desc_1;
    if (data.testi_img_1) document.getElementById('testi-1').src = data.testi_img_1;
    if (data.testi_img_2) document.getElementById('testi-2').src = data.testi_img_2;

    // 4. 基础信息
    document.getElementById('prod-desc').innerText = data.description || "";
    document.getElementById('price-tag').innerText = `RM ${data.price || "0"}`;
    document.getElementById('wa-link').href = `https://wa.me/${data.wa_number || '60126420820'}?text=Hi, 我想买 ${data.name}`;

    changeImage(1);
  }
}

window.addEventListener('load', loadProductData);
