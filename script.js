const novels = [
  {id:'n1',title:'Alchemised',author:'SenLinYu',genre:'Fantasi',price:99000,img:'images/Alchemised.jpeg',synopsis:'Novel fantasi gelap tentang seorang wanita yang terjebak antara cinta dan kekuatan terlarang di dunia sihir penuh rahasia.'},
  {id:'n2',title:'Beautiful Ugly',author:'Jane Carver',genre:'Romance',price:59000,img:'images/Beautiful Ugly.jpeg',synopsis:'Sebuah kisah misteri psikologis yang menyoroti sisi gelap hubungan manusia dan rahasia masa lalu.'},
  {id:'n3',title:'Can’t Help Faking in Love',author:'Tina Foster',genre:'Romance',price:55000,img:'images/Can’t Help Faking in Love.jpeg',synopsis:'Kisah cinta pura-pura yang berkembang menjadi perasaan sungguhan antara dua orang dengan kepribadian bertolak belakang.'},
  {id:'n4',title:'Cinta di Ujung Sajadah',author:'Asma Nadia',genre:'Religi',price:65000,img:'images/Cinta di Ujung Sajadah.jpeg',synopsis:'Kisah cinta yang dibingkai oleh nilai-nilai keimanan dan perjuangan spiritual.'},
  {id:'n5',title:'Fourth Wing',author:'Rebecca Yarros',genre:'Fantasy',price:78000,img:'images/FourthWing.jpeg',synopsis:'Petualangan epik di akademi naga dengan rahasia mematikan.'},
  {id:'n6',title:'Grave Empire',author:'L. Harkins',genre:'Thriller',price:72000,img:'images/Grave Empire.jpeg',synopsis:'Kerajaan bawah tanah penuh rahasia dan pengkhianatan.'},
  {id:'n7',title:'Hidup Ini Terlalu Banyak Kamu',author:'Boy Candra',genre:'Romance',price:49000,img:'images/Hidup Ini Terlalu Banyak Kamu.jpeg',synopsis:'Tentang cinta, kehilangan, dan keberanian untuk melupakan.'},
  {id:'n8',title:'Shy Creatures',author:'Brian Luck',genre:'Fantasy',price:62000,img:'images/Shy Creatures.jpeg',synopsis:'Makhluk pemalu yang menyimpan kekuatan besar di dunia tersembunyi.'},
  {id:'n9',title:'Sunrise on the Reaping',author:'Suzanne Collins',genre:'Action',price:75000,img:'images/Sunrise on the Reaping.jpeg',synopsis:'Kisah prekuel epik sebelum The Hunger Games.'},
  {id:'n10',title:'Tanah Para Bandit',author:'Tere Liye',genre:'Drama',price:67000,img:'images/Tanah Para Bandit.jpeg',synopsis:'Dunia tanpa hukum di mana kebenaran dipertaruhkan.'},
  {id:'n11',title:'Teruslah Bodoh Jangan Pintar',author:'Marcella',genre:'Motivasi',price:42000,img:'images/Teruslah Bodoh Jangan Pintar.jpeg',synopsis:'Cara sederhana menikmati hidup tanpa beban yang berat.'},
  {id:'n12',title:'The Devils',author:'Fyodor Dostoevsky',genre:'Classic',price:58000,img:'images/The Devils.jpeg',synopsis:'Kisah filosofi dan pemberontakan moral di Rusia abad 19.'},
  {id:'n13',title:'The Rose Field',author:'Anna Claybourne',genre:'Drama',price:53000,img:'images/The Rose Field.jpeg',synopsis:'Rahasia keluarga yang terkubur di ladang mawar.'},
  {id:'n14',title:'Untukmu, Anak Bungsu',author:'Luluk HF',genre:'Drama',price:46000,img:'images/Untukmu, Anak Bungsu.jpeg',synopsis:'Kisah hangat dan lucu dari si bungsu yang penuh kejutan.'},
  {id:'n15',title:'When the Cranes Fly South',author:'S. Hart',genre:'Romance',price:59000,img:'images/When the Cranes Fly South.jpeg',synopsis:'Cinta sejati yang menembus waktu dan musim.'}
];

const nomorWA = "6285713294542"; // Nomor WA kamu

function init(){
  renderGrid('home-grid', novels);
  renderGrid('favorites', novels.slice(0,5));
  renderGrid('catalog-grid', novels);
  renderGrid('favorit-grid', novels.slice(0,10));
  renderGenreButtons();
  populateNovelDropdown();
}

// === RENDER GRID ===
function renderGrid(id, list){
  const container = document.getElementById(id);
  container.innerHTML = '';
  list.forEach(n => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <img src="${n.img}" alt="${n.title}" class="cover">
          <h3>${n.title}</h3><p>${n.author}</p>
        </div>
        <div class="card-face card-back">
          <p>${n.synopsis.substring(0,80)}...</p>
          <button class="btn" onclick="openDetail('${n.id}')">Detail & Pesan</button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

// === DETAIL ===
function openDetail(id){
  const n = novels.find(x => x.id === id);
  const cont = document.getElementById('detail-content');
  cont.innerHTML = `
    <div class="detail">
      <img src="${n.img}" alt="${n.title}">
      <div class="detail-meta">
        <h2>${n.title}</h2>
        <p><strong>Penulis:</strong> ${n.author}</p>
        <p><strong>Genre:</strong> ${n.genre}</p>
        <p><strong>Harga:</strong> Rp ${n.price.toLocaleString()}</p>
        <p>${n.synopsis}</p>
        <button class="btn" onclick="pesanLangsung('${n.title}')">Pesan Sekarang</button>
      </div>
    </div>`;
  navigate('detail');
}

// === NAVIGASI ===
function navigate(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById(page);
  if(el) el.classList.add('active');
  window.location.hash = page;
}

// === GENRE ===
function renderGenreButtons(){
  const genres = [...new Set(novels.map(n=>n.genre))];
  const wrap = document.getElementById('genre-buttons');
  wrap.innerHTML = '';
  genres.forEach(g=>{
    const btn = document.createElement('button');
    btn.textContent = g;
    btn.onclick = ()=>filterGenre(g);
    wrap.appendChild(btn);
  });
}
function filterGenre(genre){
  renderGrid('catalog-grid', novels.filter(n=>n.genre===genre));
}
function populateNovelDropdown(){
  const select = document.getElementById('pilih-novel');
  novels.forEach(n=>{
    const opt = document.createElement('option');
    opt.value = n.title;
    opt.textContent = n.title;
    select.appendChild(opt);
  });
}
function pesanLangsung(judul){
  navigate('pesan');
  document.getElementById('pilih-novel').value = judul;
  window.scrollTo(0,0);
}

// === FORM PESAN ===
document.addEventListener('DOMContentLoaded', ()=>{
  init();
  document.getElementById('menu-toggle').addEventListener('click', ()=>{
    document.getElementById('main-nav').classList.toggle('active');
  });

  document.getElementById('detail-back').addEventListener('click', ()=>navigate('catalog'));

  document.getElementById('form-pesan').addEventListener('submit', e=>{
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const alamat = document.getElementById('alamat').value;
    const novel = document.getElementById('pilih-novel').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const item = novels.find(n=>n.title===novel);
    const total = item.price * jumlah;

    const strukHTML = `
      <div class="struk-card">
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Nomor WhatsApp:</strong> ${wa}</p>
        <p><strong>Alamat:</strong> ${alamat}</p>
        <hr>
        <p><strong>Novel:</strong> ${novel}</p>
        <p><strong>Jumlah:</strong> ${jumlah}</p>
        <p><strong>Harga Satuan:</strong> Rp ${item.price.toLocaleString()}</p>
        <p><strong>Total Bayar:</strong> Rp ${total.toLocaleString()}</p>
        <hr>
        <p>Silakan kirim pesanan ke <strong>WhatsApp Admin</strong>:</p>
        <a href="https://wa.me/${nomorWA}?text=Halo, saya ingin memesan novel *${novel}* sebanyak ${jumlah} pcs. Nama saya ${nama}, nomor saya ${wa}, alamat ${alamat}. Total: Rp ${total.toLocaleString()}." 
           target="_blank" class="btn-wa">Kirim ke WhatsApp Admin</a>
      </div>`;
    document.getElementById('struk-detail').innerHTML = strukHTML;
    navigate('struk');
  });
});