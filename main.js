const supabaseUrl = 'https://sereexsifpgpgbhmcdqv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcmVleHNpZnBncGdiaG1jZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MzgwNjcsImV4cCI6MjA4ODAxNDA2N30.6DOdcwdqyu24LaXL96iP9bLfaFnz-B2bsCbFN1aYFqs';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 切换图片的函数
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
  console.log("正在从 Supabase 同步数据...");
  const { data, error } = await _supabase.from('Products').select('*').limit(1).single();

  if (error) {
    console.error('读取失败:', error);
    return;
  }

  if (data) {
    // 1. 加载 4 张展示图
    for (let i = 1; i <= 4; i++) {
      const imageUrl = data[`image_${i}`] || data[`img${i}`]; 
      if (imageUrl) {
        const mainImg = document.getElementById(`main-${i}`);
        const thumbImg = document.getElementById(`thumb-${i}`);
        if (mainImg) mainImg.src = imageUrl;
        if (thumbImg) thumbImg.src = imageUrl;
      }
    }

    // 2. 加载 6 大核心功能 (新增逻辑)
    for (let i = 1; i <= 6; i++) {
        const fImg = document.getElementById(`feature-img-${i}`);
        const fText = document.getElementById(`feature-text-${i}`);
        const dbImg = data[`feature_img_${i}`];
        const dbText = data[`feature_text_${i}`];
        if (fImg && dbImg) fImg.src = dbImg;
        if (fText && dbText) fText.innerText = dbText;
    }

    // 3. 加载基础信息
    if (document.getElementById('prod-desc')) document.getElementById('prod-desc').innerText = data.description;
    const priceElement = document.querySelector('.text-lg.font-black');
    if (priceElement) priceElement.innerText = `RM ${data.price}`;
    
    const waBtn = document.querySelector('a[href^="https://wa.me"]');
    if (waBtn) {
      waBtn.href = `https://wa.me/${data.wa_number || '60126420820'}?text=${encodeURIComponent('你好，我想购买：' + (data.name || '产品'))}`;
    }

    // 初始化第一张主图
    changeImage(1);
  }
}

window.addEventListener('load', loadProductData);
