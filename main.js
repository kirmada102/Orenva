(function () {
  const modules = [
    {
      id: "ai-doctor",
      title: "AI Doctor",
      eyebrow: "AI consultation",
      tagline: "Instant triage, intelligent care guidance, fewer physical visits.",
      description:
        "A clinically-minded AI consultation layer that helps users assess symptoms, understand next steps, and route into the right care pathway before they even step into a waiting room.",
      benefits: [
        "Smart symptom triage with unified health context",
        "Faster answers before in-person escalation",
        "Continuous guidance that follows the user journey"
      ],
      cta: "Explore consultations",
      accent: "#8f67ff",
      glow: "#d8c7ff",
      shape: "orb",
      position: [-3.8, 1.8, -1.4],
      mobilePosition: [-1.7, 1.2, -0.8]
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      eyebrow: "Medication fulfillment",
      tagline: "Prescriptions, refills, and pharmacy logistics inside one flow.",
      description:
        "orenva connects consultations to pharmacy actions so care plans move directly from recommendation to fulfillment without forcing users into fragmented systems.",
      benefits: [
        "Integrated prescription and refill workflows",
        "Fast medication discovery and ordering",
        "Reduced friction between doctor, patient, and pharmacy"
      ],
      cta: "Open pharmacy flow",
      accent: "#a975ff",
      glow: "#e4d6ff",
      shape: "cube",
      position: [3.9, 1.5, -1.8],
      mobilePosition: [1.7, 1.1, -0.8]
    },
    {
      id: "diet-fitness",
      title: "Diet & Fitness",
      eyebrow: "Lifestyle intelligence",
      tagline: "Adaptive routines for nutrition, movement, and prevention.",
      description:
        "A dynamic coaching layer that turns health recommendations into everyday plans for meals, recovery, sleep, and movement based on the user's profile.",
      benefits: [
        "Adaptive meal, movement, and recovery plans",
        "Preventive insights guided by health context",
        "Health goals linked to the broader care system"
      ],
      cta: "View coaching",
      accent: "#7ad4ff",
      glow: "#d8f4ff",
      shape: "ring",
      position: [-4.3, -1.2, -1],
      mobilePosition: [-1.9, -0.4, -0.6]
    },
    {
      id: "therapy",
      title: "Therapy & Mental Health",
      eyebrow: "Emotional support",
      tagline: "Human-centered support for mood, resilience, and mental wellbeing.",
      description:
        "Therapy and wellbeing support sits alongside physical healthcare, helping orenva treat the user as a whole person rather than a list of disconnected issues.",
      benefits: [
        "Mental wellbeing check-ins within the same platform",
        "Support flows that feel empathetic, not clinical",
        "A continuous bridge between emotional and physical care"
      ],
      cta: "See support system",
      accent: "#ff9cc8",
      glow: "#ffe0ef",
      shape: "capsule",
      position: [0.1, -2.4, -2.1],
      mobilePosition: [0, -1.2, -0.8]
    },
    {
      id: "insurance",
      title: "Insurance",
      eyebrow: "Coverage intelligence",
      tagline: "Coverage and claims clarity built into the patient journey.",
      description:
        "Insurance becomes a readable, actionable layer inside the product so users can understand coverage and next steps without translating medical and administrative complexity on their own.",
      benefits: [
        "Coverage-aware care recommendations",
        "Reduced uncertainty around cost and claims",
        "A simpler path from diagnosis to covered action"
      ],
      cta: "Review coverage",
      accent: "#86b6ff",
      glow: "#dceaff",
      shape: "diamond",
      position: [4.4, -1.4, -1.2],
      mobilePosition: [1.9, -0.4, -0.6]
    },
    {
      id: "store",
      title: "Supplements & Store",
      eyebrow: "Marketplace layer",
      tagline: "Supplements, proteins, and trusted health products in one ecosystem.",
      description:
        "The store layer extends the health journey into recommended products and wellness essentials, keeping product discovery aligned with personal health goals.",
      benefits: [
        "Trusted wellness products alongside care insights",
        "Contextual supplement and protein recommendations",
        "One checkout mindset across care and commerce"
      ],
      cta: "Enter marketplace",
      accent: "#ffcb7a",
      glow: "#fff0d4",
      shape: "prism",
      position: [0.5, 2.9, -2.5],
      mobilePosition: [0, 2.1, -1]
    }
  ];

  const state = {
    activated: false,
    activeModuleId: null
  };

  const root = document.documentElement;
  const body = document.body;
  const siteHeader = document.querySelector(".site-header");
  const activationStatus = document.getElementById("activationStatus");
  const activationDetail = document.getElementById("activationDetail");
  const currentFocusTitle = document.getElementById("currentFocusTitle");
  const currentFocusText = document.getElementById("currentFocusText");
  const panelBackdrop = document.getElementById("panelBackdrop");
  const panel = document.getElementById("modulePanel");
  const panelClose = document.getElementById("panelClose");
  const panelEyebrow = document.getElementById("panelEyebrow");
  const panelTitle = document.getElementById("panelTitle");
  const panelTagline = document.getElementById("panelTagline");
  const panelGradient = document.getElementById("panelGradient");
  const panelDescription = document.getElementById("panelDescription");
  const panelBenefits = document.getElementById("panelBenefits");
  const panelCta = document.getElementById("panelCta");
  const scenePulse = document.getElementById("scenePulse");
  const activateButtons = Array.from(document.querySelectorAll("[data-activate]"));
  const moduleButtons = Array.from(document.querySelectorAll("[data-module]"));
  const themeToggles = Array.from(document.querySelectorAll("[data-theme-toggle]"));

  const sceneController = initHeroScene();

  setupThemeToggle();
  setupMenu();
  setupHeaderVisibility();
  setupReveal();
  setupWaitlistForms();
  setupModuleButtons();
  setupPanel();
  highlightCurrentPage();
  updateUi();

  function getModule(id) {
    return modules.find((module) => module.id === id) || null;
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    if (persist) {
      try {
        localStorage.setItem("orenva-theme", theme);
      } catch (error) {}
    }

    themeToggles.forEach(function (button) {
      const dark = theme === "dark";
      button.setAttribute("aria-pressed", String(dark));
      const label = button.querySelector(".theme-toggle-text");
      if (label) {
        label.textContent = dark ? "Light mode" : "Dark mode";
      }
    });

    if (sceneController && typeof sceneController.setTheme === "function") {
      sceneController.setTheme(theme);
    }
  }

  function setupThemeToggle() {
    const initialTheme = getCurrentTheme();
    applyTheme(initialTheme, false);

    themeToggles.forEach(function (button) {
      button.addEventListener("click", function () {
        const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    });
  }

  function setupMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const links = document.querySelectorAll(".site-nav a");

    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", function () {
      const isOpen = body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupHeaderVisibility() {
    if (!siteHeader) {
      return;
    }

    let ticking = false;

    function updateHeaderState() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const shouldShow = scrollY <= 24 || body.classList.contains("menu-open") || body.classList.contains("panel-open");

      body.classList.toggle("header-hidden", !shouldShow && scrollY > 80);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateHeaderState);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateHeaderState();
  }

  function setupReveal() {
    const revealItems = document.querySelectorAll("[data-reveal]");

    revealItems.forEach(function (item, index) {
      const stagger = (index % 6) * 70;
      item.style.setProperty("--reveal-delay", stagger + "ms");
    });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function setupWaitlistForms() {
    const forms = document.querySelectorAll("[data-waitlist-form]");

    forms.forEach(function (form) {
      const feedback = form.parentElement.querySelector("[data-waitlist-feedback]");
      const input = form.querySelector('input[name="email"]');

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!input || !feedback) {
          return;
        }

        const value = input.value.trim();
        if (!value) {
          feedback.textContent = "Add an email to preview the orenva waitlist flow.";
          return;
        }

        feedback.textContent = "Thanks. " + value + " is queued for the orenva waitlist preview.";
        form.reset();
      });
    });
  }

  function setupModuleButtons() {
    moduleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openModule(button.getAttribute("data-module"));
      });
    });

    activateButtons.forEach(function (button) {
      button.addEventListener("click", activateExperience);
    });
  }

  function setupPanel() {
    if (!panel || !panelBackdrop || !panelClose) {
      return;
    }

    panelClose.addEventListener("click", closePanel);
    panelBackdrop.addEventListener("click", closePanel);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePanel();
      }
    });
  }

  function highlightCurrentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".site-nav a");

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href") || "";
      const target = href.split("#")[0] || "index.html";

      if (path === "index.html" || path === "") {
        if (href === "#hero" || href === "index.html#hero") {
          link.classList.add("is-active");
        }
      }

      if (target === path && !href.includes("#")) {
        link.classList.add("is-active");
      }
    });
  }

  function activateExperience() {
    if (!state.activated) {
      state.activated = true;
      body.classList.add("is-activated");
      activateButtons.forEach(function (button) {
        button.textContent = "orenva activated";
      });
    }

    if (scenePulse) {
      scenePulse.classList.remove("is-live");
      void scenePulse.offsetWidth;
      scenePulse.classList.add("is-live");
    }

    updateUi();
  }

  function openModule(id) {
    const module = getModule(id);

    if (!module) {
      return;
    }

    activateExperience();
    state.activeModuleId = module.id;
    updateUi();

    if (!panel || !panelBackdrop) {
      return;
    }

    panelEyebrow.textContent = module.eyebrow;
    panelTitle.textContent = module.title;
    panelTagline.textContent = module.tagline;
    panelGradient.style.background =
      "linear-gradient(90deg, " + module.glow + ", " + module.accent + ")";
    panelDescription.textContent = module.description;
    panelCta.textContent = module.cta;

    panelBenefits.innerHTML = "";
    module.benefits.forEach(function (benefit) {
      const item = document.createElement("li");
      item.textContent = benefit;
      panelBenefits.appendChild(item);
    });

    body.classList.add("panel-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    if (!panel) {
      return;
    }

    body.classList.remove("panel-open");
    panel.setAttribute("aria-hidden", "true");
  }

  function updateUi() {
    const activeModule = getModule(state.activeModuleId);

    if (activationStatus) {
      activationStatus.textContent = state.activated
        ? "orenva ecosystem live"
        : "Waiting for activation";
    }

    if (activationDetail) {
      activationDetail.textContent = state.activated
        ? "The core is live. Click a floating module or a card below to inspect how it fits into the broader healthcare journey."
        : "Trigger the orenva core to release the modules into the scene and open the interface as one healthcare intelligence system.";
    }

    if (currentFocusTitle) {
      currentFocusTitle.textContent = activeModule ? activeModule.title : "orenva Core";
    }

    if (currentFocusText) {
      currentFocusText.textContent = activeModule
        ? activeModule.description
        : "A unified AI-first operating layer that coordinates consultation, care, coverage, and wellness commerce as one experience.";
    }

    moduleButtons.forEach(function (button) {
      button.classList.toggle("is-selected", button.getAttribute("data-module") === state.activeModuleId);
    });
  }

  function initHeroScene() {
    const canvas = document.getElementById("sceneCanvas");
    const THREE = window.THREE;

    if (!canvas || !THREE) {
      return null;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isMobile = window.matchMedia("(max-width: 820px)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#f4ecff", 8.5, 20);

    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 42, 1, 0.1, 40);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.3);
    const keyLight = new THREE.DirectionalLight("#fff8ff", 1.9);
    const fillLight = new THREE.DirectionalLight("#d2bcff", 0.46);
    keyLight.position.set(-5, 4, 5);
    fillLight.position.set(5, -4, 3);
    scene.add(ambientLight, keyLight, fillLight);

    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const orbGroup = new THREE.Group();
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: "#eadcff",
      emissive: "#af84ff",
      emissiveIntensity: 0.22,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.88,
      thickness: 0.95,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      ior: 1.1,
      transparent: true,
      opacity: 0.96
    });

    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(isMobile ? 1.12 : 1.34, 4),
      orbMaterial
    );
    coreMesh.userData.role = "activate";
    orbGroup.add(coreMesh);

    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.78, 42, 42),
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.26
      })
    );
    orbGroup.add(coreGlow);

    const ringOne = new THREE.Mesh(
      new THREE.TorusGeometry(1.46, 0.024, 18, 120),
      new THREE.MeshBasicMaterial({
        color: "#efe4ff",
        transparent: true,
        opacity: 0.44
      })
    );
    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.018, 14, 96),
      new THREE.MeshBasicMaterial({
        color: "#a578ff",
        transparent: true,
        opacity: 0.28
      })
    );
    ringTwo.rotation.x = Math.PI / 2.35;
    orbGroup.add(ringOne, ringTwo);

    const orbLight = new THREE.PointLight("#bd8cff", 11, 18);
    orbGroup.add(orbLight);
    heroGroup.add(orbGroup);

    const pulseGroup = new THREE.Group();
    const pulseMaterials = [];
    for (let index = 0; index < 3; index += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: index === 0 ? "#f8f1ff" : "#b889ff",
        transparent: true,
        opacity: 0
      });
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.56 + index * 0.18, 0.018, 12, 120),
        material
      );
      ring.rotation.x = index % 2 === 0 ? Math.PI / 2 : Math.PI / 3;
      pulseGroup.add(ring);
      pulseMaterials.push(material);
    }
    heroGroup.add(pulseGroup);

    const particleCount = reducedMotion ? 80 : isMobile ? 110 : 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = isMobile ? 7 : 11;
      const offset = index * 3;
      particlePositions[offset] = (Math.random() - 0.5) * radius;
      particlePositions[offset + 1] = (Math.random() - 0.5) * radius;
      particlePositions[offset + 2] = (Math.random() - 0.5) * radius * 0.7;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: "#ffffff",
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    heroGroup.add(particles);

    const moduleObjects = modules.map(function (module) {
      const moduleGroup = new THREE.Group();
      moduleGroup.userData.role = "module";
      moduleGroup.userData.moduleId = module.id;

      const material = new THREE.MeshPhysicalMaterial({
        color: module.glow,
        emissive: module.accent,
        emissiveIntensity: 0.2,
        metalness: 0.08,
        roughness: 0.12,
        transmission: 0.82,
        thickness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.08,
        transparent: true,
        opacity: 0.92
      });

      const mesh = new THREE.Mesh(createModuleGeometry(THREE, module.shape), material);
      mesh.userData.role = "module";
      mesh.userData.moduleId = module.id;

      const glowMaterial = new THREE.MeshBasicMaterial({
        color: module.accent,
        transparent: true,
        opacity: 0.12
      });
      const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(1.05, 28, 28), glowMaterial);
      glowMesh.scale.setScalar(module.shape === "ring" ? 1.05 : 1.28);
      glowMesh.userData.role = "module";
      glowMesh.userData.moduleId = module.id;

      const pointLight = new THREE.PointLight(module.accent, 2.8, 8);
      pointLight.userData.role = "module";
      pointLight.userData.moduleId = module.id;

      moduleGroup.add(mesh, glowMesh, pointLight);
      heroGroup.add(moduleGroup);

      return {
        data: module,
        group: moduleGroup,
        material: material,
        glowMaterial: glowMaterial,
        light: pointLight,
        phase: Math.random() * Math.PI * 2,
        targetPosition: new THREE.Vector3(),
        targetScale: new THREE.Vector3(0.02, 0.02, 0.02)
      };
    });

    const interactiveObjects = [orbGroup].concat(moduleObjects.map(function (item) {
      return item.group;
    }));
    const pointer = new THREE.Vector2(3, 3);
    const raycaster = new THREE.Raycaster();
    const desiredCameraPosition = new THREE.Vector3();
    const desiredLookAt = new THREE.Vector3();
    const smoothLookAt = new THREE.Vector3();
    const hoverState = { role: null, moduleId: null };
    const clock = new THREE.Clock();

    function applySceneTheme(theme) {
      const dark = theme === "dark";

      scene.fog.color.set(dark ? "#110d1f" : "#f4ecff");
      ambientLight.color.set(dark ? "#e7d9ff" : "#ffffff");
      ambientLight.intensity = dark ? 1.02 : 1.3;
      keyLight.color.set(dark ? "#bb9cff" : "#fff8ff");
      keyLight.intensity = dark ? 1.36 : 1.9;
      fillLight.color.set(dark ? "#765db2" : "#d2bcff");
      fillLight.intensity = dark ? 0.62 : 0.46;
      particleMaterial.color.set(dark ? "#dac8ff" : "#ffffff");
      particleMaterial.opacity = dark ? 0.6 : 0.72;
      orbMaterial.color.set(dark ? "#dac5ff" : "#eadcff");
      orbMaterial.emissive.set(dark ? "#956aff" : "#af84ff");
      orbLight.color.set(dark ? "#a682ff" : "#bd8cff");
      pulseMaterials.forEach(function (material, index) {
        material.color.set(index === 0 ? (dark ? "#e9deff" : "#f8f1ff") : dark ? "#9f79ff" : "#b889ff");
      });
    }

    function resolvePointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    canvas.addEventListener("pointermove", function (event) {
      resolvePointer(event);
    });

    canvas.addEventListener("pointerleave", function () {
      pointer.set(3, 3);
      hoverState.role = null;
      hoverState.moduleId = null;
      canvas.style.cursor = "default";
    });

    canvas.addEventListener("click", function () {
      if (hoverState.role === "activate") {
        activateExperience();
      }

      if (hoverState.moduleId) {
        openModule(hoverState.moduleId);
      }
    });

    function refreshHover() {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveObjects, true);

      hoverState.role = null;
      hoverState.moduleId = null;

      if (hits.length) {
        let target = hits[0].object;

        while (target) {
          if (target.userData.role === "activate") {
            hoverState.role = "activate";
            break;
          }

          if (target.userData.moduleId) {
            hoverState.role = "module";
            hoverState.moduleId = target.userData.moduleId;
            break;
          }

          target = target.parent;
        }
      }

      canvas.style.cursor = hoverState.role ? "pointer" : "default";
    }

    function resize() {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      isMobile = window.matchMedia("(max-width: 820px)").matches;
      camera.fov = isMobile ? 50 : 42;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.setSize(width, height, false);
    }

    function syncSceneInteractivity() {
      canvas.style.pointerEvents = window.scrollY < window.innerHeight * 0.92 ? "auto" : "none";
    }

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      refreshHover();

      const pointerX = pointer.x === 3 ? 0 : pointer.x;
      const pointerY = pointer.y === 3 ? 0 : pointer.y;
      const pointerInfluenceX = pointerX * (isMobile ? 0.22 : 0.48);
      const pointerInfluenceY = pointerY * (isMobile ? 0.12 : 0.24);
      const activeModule = getModule(state.activeModuleId);
      const activePosition = activeModule
        ? isMobile
          ? activeModule.mobilePosition
          : activeModule.position
        : null;

      if (activePosition) {
        desiredCameraPosition.set(
          activePosition[0] * 0.42 + pointerInfluenceX,
          activePosition[1] * 0.18 - pointerInfluenceY + 0.12,
          isMobile ? 5.35 : 6.2
        );
        desiredLookAt.set(activePosition[0] * 0.28, activePosition[1] * 0.08, activePosition[2]);
      } else {
        desiredCameraPosition.set(
          pointerInfluenceX,
          (state.activated ? 0.18 : 0.04) - pointerInfluenceY,
          isMobile ? 6.7 : 8.2
        );
        desiredLookAt.set(0, 0.05, 0);
      }

      const cameraDamping = 1 - Math.exp(-delta * 2.4);
      camera.position.lerp(desiredCameraPosition, cameraDamping);
      smoothLookAt.lerp(desiredLookAt, cameraDamping);
      camera.lookAt(smoothLookAt);

      const orbScaleTarget = state.activated
        ? hoverState.role === "activate"
          ? 1.16
          : 1.08
        : hoverState.role === "activate"
          ? 1.05
          : 0.98;
      const orbScaleVector = new THREE.Vector3(orbScaleTarget, orbScaleTarget, orbScaleTarget);
      orbGroup.scale.lerp(orbScaleVector, 1 - Math.exp(-delta * 4));
      orbGroup.rotation.y += delta * 0.26;
      orbGroup.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.85) * 0.14;
      ringOne.rotation.x += delta * 0.24;
      ringOne.rotation.y += delta * 0.38;
      ringTwo.rotation.x -= delta * 0.18;
      ringTwo.rotation.z += delta * 0.26;
      orbMaterial.emissiveIntensity = state.activated ? 0.42 : 0.24;
      orbLight.intensity = state.activated ? 16 : 11;

      pulseGroup.visible = state.activated;
      pulseGroup.children.forEach(function (ring, index) {
        const time = (elapsed * 0.55 + index * 0.22) % 1;
        const scale = 0.84 + time * 1.6;
        ring.scale.setScalar(scale);
        pulseMaterials[index].opacity = (1 - time) * 0.2;
      });

      particles.rotation.y += delta * 0.04;
      particles.rotation.x = reducedMotion ? 0 : Math.sin(elapsed * 0.12) * 0.08;

      moduleObjects.forEach(function (item) {
        const anchor = isMobile ? item.data.mobilePosition : item.data.position;
        const hovered = hoverState.moduleId === item.data.id;
        const active = state.activeModuleId === item.data.id;
        const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.9 + item.phase) * 0.22;
        const targetScale = state.activated ? (active ? 1.18 : hovered ? 1.08 : 0.96) : 0.02;
        const targetZ = state.activated ? anchor[2] : 0;

        item.targetPosition.set(anchor[0], anchor[1] + drift, targetZ);
        item.targetScale.setScalar(targetScale);

        const damping = 1 - Math.exp(-delta * 3.1);
        item.group.position.lerp(item.targetPosition, damping);
        item.group.scale.lerp(item.targetScale, damping);
        item.group.rotation.y += delta * (active ? 0.72 : 0.32);
        item.group.rotation.x = THREE.MathUtils.lerp(
          item.group.rotation.x,
          hovered ? 0.18 : 0.06,
          damping
        );

        item.material.emissiveIntensity = active ? 0.52 : hovered ? 0.34 : 0.22;
        item.glowMaterial.opacity = active ? 0.24 : hovered ? 0.18 : 0.12;
        item.light.intensity = active ? 6.8 : hovered ? 4.5 : 2.8;
      });

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", syncSceneInteractivity, { passive: true });
    resize();
    syncSceneInteractivity();
    applySceneTheme(getCurrentTheme());
    animate();

    return {
      setTheme: applySceneTheme
    };
  }

  function createModuleGeometry(THREE, shape) {
    switch (shape) {
      case "cube":
        return new THREE.BoxGeometry(1.26, 1.26, 1.26, 4, 4, 4);
      case "diamond":
        return new THREE.OctahedronGeometry(0.94, 0);
      case "capsule":
        if (typeof THREE.CapsuleGeometry === "function") {
          return new THREE.CapsuleGeometry(0.42, 0.96, 8, 16);
        }
        return new THREE.CylinderGeometry(0.42, 0.42, 1.5, 20);
      case "ring":
        return new THREE.TorusGeometry(0.72, 0.24, 18, 72);
      case "prism":
        return new THREE.CylinderGeometry(0.65, 0.92, 1.34, 6);
      case "orb":
      default:
        return new THREE.SphereGeometry(0.9, 36, 36);
    }
  }
})();
