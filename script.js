// script.js
function submitQuiz() {
    const submitSound = document.getElementById("submitSound");
    if (submitSound) submitSound.play();
  
    const choices = [];
    for (let i = 0; i < 5; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) choices.push(selected.value);
    }
  
    const result = document.getElementById("result");
    result.innerHTML = "";
  
    if (choices.length < 5) {
      result.style.color = "red";
      result.innerText = "Please answer all the questions by clicking Yes or No.";
      return;
    }
  
    const domainMap = {
      it: {
        title: "CSE Domain",
        maxPackage: "₹12 LPA",
        cards: [
          { label: "Software Development", class: "it", key: "software" },
          { label: "Web Developer", class: "web", key: "web" },
          { label: "Software Associate", class: "sql", key: "associate" }
        ]
      },
      ece: {
        title: "ECE Domain",
        maxPackage: "₹10 LPA",
        cards: [
          { label: "VLSI", class: "vlsi", key: "vlsi" },
          { label: "Embedded Systems", class: "embedded", key: "embedded" },
          { label: "PCB Design", class: "pcb", key: "pcb" }
        ]
      },
      civil: {
        title: "Civil Domain",
        maxPackage: "₹6.5 LPA",
        cards: [
          { label: "Site Engineer", class: "civil", key: "civil" },
          { label: "Structural Design", class: "design", key: "design" }
        ]
      },
      mech: {
        title: "Mechanical Domain",
        maxPackage: "₹7.5 LPA",
        cards: [
          { label: "CAD", class: "cad", key: "cad" },
          { label: "Thermal Design", class: "thermal", key: "thermal" }
        ]
      }
    };
  
    for (const domainKey of Object.keys(domainMap)) {
      if (choices.includes(domainKey)) {
        const domain = domainMap[domainKey];
        const domainDiv = document.createElement("div");
        domainDiv.classList.add("domain-section");
  
        const domainTitle = document.createElement("h2");
        domainTitle.innerText = `${domain.title} (Highest Package: ${domain.maxPackage})`;
        domainTitle.style.color = "red";
        domainDiv.appendChild(domainTitle);
  
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("result-cards");
  
        domain.cards.forEach(card => {
          const cardDiv = document.createElement("div");
          cardDiv.className = `card ${card.class}`;
          cardDiv.textContent = card.label;
          cardDiv.setAttribute("data-role", card.key);
          cardDiv.onclick = () => showDetails(cardDiv, card.key);
          cardsContainer.appendChild(cardDiv);
        });
  
        domainDiv.appendChild(cardsContainer);
        result.appendChild(domainDiv);
      }
    }
  }
  
  function showDetails(cardElement, role) {
    const selectSound = document.getElementById("selectSound");
    if (selectSound) selectSound.play();
  
    const parent = cardElement.closest(".result-cards");
    const existing = parent.querySelector(".details-box");
    if (existing) existing.remove();
  
    const info = {
      software: {
        title: "Software Development",
        learn: ["DSA", "Java or Python", "SQL", "OOPs", "System Design"],
        jobs: ["Software Engineer", "Full Stack Dev", "Backend Developer"],
        salary: "₹12 LPA"
      },
      web: {
        title: "Web Developer",
        learn: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB/SQL"],
        jobs: ["Frontend Dev", "Web App Dev", "UI Developer"],
        salary: "₹9 LPA"
      },
      associate: {
        title: "Software Associate",
        learn: ["Core Java", "DBMS", "Communication Skills"],
        jobs: ["Support Engineer", "Junior Developer", "QA Tester"],
        salary: "₹6 LPA"
      },
      vlsi: {
        title: "VLSI",
        learn: ["Digital Electronics", "Verilog/VHDL", "Physical Design"],
        jobs: ["VLSI Engineer", "Physical Design Engg", "ASIC Engg"],
        salary: "₹10 LPA"
      },
      embedded: {
        title: "Embedded Systems",
        learn: ["C Programming", "8051/ARM", "RTOS", "Protocols like I2C"],
        jobs: ["Embedded Dev", "Firmware Engg", "IoT Dev"],
        salary: "₹8 LPA"
      },
      pcb: {
        title: "PCB Design",
        learn: ["Eagle/Altium", "Circuit Theory", "Layout Design"],
        jobs: ["PCB Design Engg", "Board Testing", "Hardware Dev"],
        salary: "₹7 LPA"
      },
      civil: {
        title: "Site Engineer",
        learn: ["AutoCAD", "Site Management", "Concrete Design"],
        jobs: ["Construction Engineer", "Site Supervisor", "Project Exec"],
        salary: "₹5.5 LPA"
      },
      design: {
        title: "Structural Design",
        learn: ["STAAD Pro", "Revit", "Steel Design"],
        jobs: ["Structural Engg", "Consultant", "Draftsman"],
        salary: "₹6.5 LPA"
      },
      cad: {
        title: "CAD",
        learn: ["AutoCAD", "SolidWorks", "Mechanical Drawing"],
        jobs: ["Design Engineer", "Draftsman", "CAD Operator"],
        salary: "₹7.5 LPA"
      },
      thermal: {
        title: "Thermal Design",
        learn: ["Thermodynamics", "HVAC", "Simulation Software"],
        jobs: ["Thermal Engg", "Plant Maintenance", "Project Dev"],
        salary: "₹7 LPA"
      }
    };
  
    const item = info[role];
    if (item) {
      const box = document.createElement("div");
      box.className = "details-box";
      box.innerHTML = `
        <h3>${item.title}</h3>
        <strong>Learn:</strong> ${item.learn.join(", ")}<br/>
        <strong>Job Roles:</strong> ${item.jobs.join(", ")}<br/>
        <strong>Highest Package:</strong> ${item.salary}
      `;
      cardElement.insertAdjacentElement("afterend", box);
    }
  }
  
  // Eye movement logic
  const pupils = document.querySelectorAll(".pupil");
  
  function movePupils(e) {
    pupils.forEach((pupil) => {
      const rect = pupil.parentElement.getBoundingClientRect();
      const centerX = rect.left + window.scrollX + rect.width / 2;
      const centerY = rect.top + window.scrollY + rect.height / 2;
  
      const angleX = e.pageX - centerX;
      const angleY = e.pageY - centerY;
      const distance = Math.min(Math.sqrt(angleX ** 2 + angleY ** 2), 10);
      const angle = Math.atan2(angleY, angleX);
  
      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;
  
      pupil.style.left = 15 + pupilX + "px";
      pupil.style.top = 15 + pupilY + "px";
    });
  }
  
  function resetPupils() {
    pupils.forEach((pupil) => {
      pupil.style.left = "15px";
      pupil.style.top = "15px";
    });
  }
  
  document.addEventListener("mousemove", movePupils);
  document.addEventListener("mouseleave", resetPupils);
  
  