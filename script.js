const form = document.querySelector('#careerForm');
const results = document.querySelector('#results');
const progressBar = document.querySelector('#progressBar');
const progressLabel = document.querySelector('#progressLabel');
const selected = { skills: new Set(), interests: new Set() };

const careerData = {
  marketing: {
    title: 'Digital Marketing Specialist',
    description: 'วางแผนคอนเทนต์ แคมเปญ และการสื่อสารแบรนด์บนช่องทางดิจิทัล',
    tags: ['Content strategy', 'Social media', 'Analytics'],
    skills: ['Google Analytics พื้นฐาน', 'การวาง Content Calendar', 'การยิงโฆษณาออนไลน์'],
    market: 'ธุรกิจต้องการคนที่สื่อสารกับลูกค้าได้ดีและใช้ข้อมูลช่วยปรับแคมเปญ จึงเป็นจุดเริ่มต้นที่เติบโตต่อได้หลายสาย'
  },
  creator: {
    title: 'Content Creator',
    description: 'สร้างเนื้อหาให้น่าสนใจ เล่าเรื่องแบรนด์ และเชื่อมต่อกับผู้ชมในโลกออนไลน์',
    tags: ['Storytelling', 'Canva', 'Creative'],
    skills: ['การเล่าเรื่องผ่านคอนเทนต์', 'การตัดต่อวิดีโอสั้น', 'การอ่าน Insight ของผู้ชม'],
    market: 'แบรนด์ลงทุนกับวิดีโอสั้นและคอนเทนต์เฉพาะกลุ่มมากขึ้น คนที่สร้างสรรค์และเข้าใจผู้ชมจึงมีโอกาสโดดเด่น'
  },
  social: {
    title: 'Social Media Manager',
    description: 'ดูแลตัวตนของแบรนด์บนโซเชียล สร้างบทสนทนา และติดตามผลตอบรับของชุมชน',
    tags: ['Community', 'Planning', 'Trends'],
    skills: ['Social Listening', 'Community Management', 'การรับมือสถานการณ์บนโซเชียล'],
    market: 'ทุกแบรนด์ต้องรักษาความสัมพันธ์กับชุมชนออนไลน์ บทบาทนี้เหมาะกับคนที่ตามเทรนด์และสื่อสารคล่อง'
  },
  ux: {
    title: 'UX/UI Designer',
    description: 'ออกแบบหน้าจอและประสบการณ์ที่ทำให้ผู้ใช้บรรลุเป้าหมายได้ง่ายและรู้สึกดี',
    tags: ['Figma', 'User research', 'Prototype'],
    skills: ['Figma และ Auto Layout', 'User Flow', 'การทดสอบกับผู้ใช้'],
    market: 'องค์กรดิจิทัลแข่งขันกันที่ประสบการณ์ลูกค้า ความสามารถในการเข้าใจผู้ใช้และแปลงเป็นหน้าจอจึงมีคุณค่า'
  },
  data: {
    title: 'Data Analyst',
    description: 'ตั้งคำถามกับข้อมูล สร้างรายงาน และช่วยทีมตัดสินใจด้วยหลักฐานที่ชัดเจน',
    tags: ['Excel', 'Dashboard', 'SQL'],
    skills: ['Excel ขั้นกลาง–สูง', 'SQL พื้นฐาน', 'การทำ Dashboard'],
    market: 'การตัดสินใจแบบใช้ข้อมูลเป็นหัวใจของธุรกิจ คนที่แปลตัวเลขให้เป็นเรื่องราวเข้าใจง่ายเป็นที่ต้องการเสมอ'
  },
  product: {
    title: 'Product Manager',
    description: 'เชื่อมโจทย์ผู้ใช้ กลยุทธ์ธุรกิจ และทีมพัฒนา เพื่อสร้างผลิตภัณฑ์ที่มีคุณค่า',
    tags: ['Strategy', 'User needs', 'Teamwork'],
    skills: ['Product Discovery', 'การเขียน Requirement', 'การจัดลำดับความสำคัญ'],
    market: 'บทบาทนี้เหมาะกับคนที่มองภาพรวม สื่อสารกับหลายฝ่าย และสนุกกับการแก้ปัญหาที่ซับซ้อน'
  },
  developer: {
    title: 'Web Developer',
    description: 'พัฒนาเว็บไซต์และระบบที่ผู้ใช้ใช้งานจริง พร้อมต่อยอดเป็นผลิตภัณฑ์ดิจิทัล',
    tags: ['HTML/CSS', 'JavaScript', 'Problem solving'],
    skills: ['HTML, CSS และ JavaScript', 'Git / GitHub', 'การอ่านและแก้บั๊ก'],
    market: 'ธุรกิจทุกขนาดยังต้องการระบบดิจิทัล ผู้พัฒนาที่เรียนรู้ต่อเนื่องและเข้าใจผู้ใช้มีโอกาสเติบโตมาก'
  },
  business: {
    title: 'Business Development',
    description: 'หาโอกาสใหม่ สร้างความร่วมมือ และผลักดันธุรกิจให้เติบโตด้วยข้อมูลและการสื่อสาร',
    tags: ['Business', 'Negotiation', 'Strategy'],
    skills: ['การนำเสนอ Pitch', 'Market Research', 'การวิเคราะห์โมเดลธุรกิจ'],
    market: 'ธุรกิจดิจิทัลต้องการคนที่มองเห็นโอกาสและเชื่อมความต้องการของลูกค้ากับเป้าหมายขององค์กร'
  }
};

function updateProgress() {
  const scalarFields = ['major', 'salary', 'workStyle'].filter(id => document.querySelector(`#${id}`).value).length;
  const selectedFields = Number(selected.skills.size > 0) + Number(selected.interests.size > 0);
  const percent = Math.round(((scalarFields + selectedFields) / 5) * 100);
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `ข้อมูลพร้อมวิเคราะห์ ${percent}%`;
}

document.querySelectorAll('.chip-options button').forEach(button => {
  button.addEventListener('click', () => {
    const group = button.closest('.chip-options').dataset.group;
    const value = button.dataset.value;
    if (selected[group].has(value)) selected[group].delete(value);
    else selected[group].add(value);
    button.classList.toggle('selected');
    updateProgress();
  });
});
document.querySelectorAll('select').forEach(input => input.addEventListener('change', updateProgress));

function getRecommendations() {
  const scores = { marketing: 0, creator: 0, social: 0, ux: 0, data: 0, product: 0, developer: 0, business: 0 };
  const skills = selected.skills;
  const interests = selected.interests;
  const major = form.major.value;
  const workStyle = form.workStyle.value;

  const add = (keys, amount) => keys.forEach(key => scores[key] += amount);
  if (skills.has('canva')) add(['creator', 'ux', 'marketing'], 3);
  if (skills.has('content')) add(['creator', 'marketing', 'social'], 3);
  if (skills.has('social')) add(['social', 'marketing', 'creator'], 3);
  if (skills.has('data')) add(['data', 'marketing', 'business'], 3);
  if (skills.has('code')) add(['developer', 'data', 'product'], 3);
  if (skills.has('communication')) add(['product', 'business', 'social'], 3);
  if (interests.has('marketing')) add(['marketing', 'social', 'creator'], 4);
  if (interests.has('creative')) add(['creator', 'ux', 'marketing'], 4);
  if (interests.has('technology')) add(['developer', 'data', 'product'], 4);
  if (interests.has('people')) add(['product', 'business', 'social'], 4);
  if (interests.has('business')) add(['business', 'product', 'marketing'], 4);
  if (interests.has('numbers')) add(['data', 'business', 'marketing'], 4);
  if (major === 'digital-business') add(['marketing', 'product', 'business', 'data'], 2);
  if (major === 'business') add(['marketing', 'business', 'social'], 2);
  if (major === 'it') add(['developer', 'data', 'product'], 2);
  if (major === 'design') add(['ux', 'creator', 'marketing'], 2);
  if (workStyle === 'team') add(['product', 'business', 'social'], 2);
  if (workStyle === 'creative') add(['creator', 'ux', 'marketing'], 2);
  if (workStyle === 'analytical') add(['data', 'developer', 'product'], 2);
  if (workStyle === 'dynamic') add(['marketing', 'social', 'business'], 2);
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key, score], index) => ({ key, score, index }));
}

function renderResults(recommendations) {
  const cards = document.querySelector('#careerCards');
  const name = form.major.options[form.major.selectedIndex].text;
  const skills = [...selected.skills];
  const interests = [...selected.interests];
  const highScore = recommendations[0].score || 1;
  const main = careerData[recommendations[0].key];
  document.querySelector('#resultTitle').textContent = 'เส้นทางที่น่าสนใจสำหรับคุณ';
  document.querySelector('#resultSummary').textContent = `จากข้อมูลเรื่อง ${name} ทักษะและความสนใจที่คุณเลือก ระบบมองว่าคุณมีจุดแข็งที่ต่อยอดไปยังสาย “${main.title}” ได้ดี ลองใช้ผลลัพธ์นี้เป็นจุดเริ่มต้นของการค้นคว้าและฝึกฝนต่อไป`;
  cards.innerHTML = recommendations.map(({ key, score, index }) => {
    const item = careerData[key];
    const percentage = Math.min(96, Math.max(72, 76 + Math.round((score / highScore) * 18) - index * 3));
    return `<article class="career-result ${index === 0 ? 'primary' : ''}">
      <span class="match-label">✦ ความเหมาะสม ${percentage}%</span>
      <h3>${item.title}</h3><p>${item.description}</p>
      <div class="result-meta">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    </article>`;
  }).join('');
  const combinedSkills = [...new Set(recommendations.flatMap(({ key }) => careerData[key].skills))].slice(0, 4);
  document.querySelector('#skillList').innerHTML = combinedSkills.map(skill => `<li>${skill}</li>`).join('');
  document.querySelector('#planList').innerHTML = `
    <li>เลือก 1 สายอาชีพที่อยากลองมากที่สุด</li>
    <li>เรียนบทเรียนพื้นฐาน 3–5 ชั่วโมง</li>
    <li>ทำผลงานเล็ก ๆ 1 ชิ้นใส่ Portfolio</li>`;
  document.querySelector('#marketInsight').textContent = main.market;
  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!selected.skills.size || !selected.interests.size) {
    alert('กรุณาเลือกทักษะและเรื่องที่คุณสนใจอย่างน้อย 1 ข้อ เพื่อให้แนะนำได้ตรงขึ้น');
    return;
  }
  renderResults(getRecommendations());
});

document.querySelector('#restartButton').addEventListener('click', () => {
  results.hidden = true;
  document.querySelector('#advisor').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
