// Basic UX & animations
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Fade in on scroll
  document.querySelectorAll('.service, .price, .work-card').forEach((el, i) => {
    gsap.fromTo(el, {y: 24, opacity: 0}, {
      y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      delay: (i % 3) * 0.08
    });
  });

  // Hero float
  gsap.to('.tilt', {
    rotateY: -10, rotateX: 4, y: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Load profile details from data/profile.json
  fetch('data/profile.json')
    .then(r => r.json())
    .then(profile => {
      if (profile.name) document.getElementById('profileName').textContent = profile.name;
      if (profile.title) document.getElementById('profileTitle').textContent = profile.title;
      if (profile.bio) document.getElementById('profileBio').textContent = profile.bio;
      if (profile.email) {
        const el = document.getElementById('emailLink');
        el.href = `mailto:${profile.email}`;
        el.textContent = profile.email;
      }
      if (profile.avatar && profile.avatar.length) {
        document.getElementById('profileAvatar').src = profile.avatar;
      }
      const linksWrap = document.getElementById('profileLinks');
      if (Array.isArray(profile.links)) {
        profile.links.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = link.label || link.url;
          a.className = 'btn-secondary';
          linksWrap.appendChild(a);
        });
      }
    })
    .catch(() => {
      // silently ignore if profile file missing
    });
});
document.addEventListener("DOMContentLoaded", () => {
  // Autofill service when clicked
  document.querySelectorAll("[data-service]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const service = btn.dataset.service;
      document.getElementById("selectedService").value = service;
      document.getElementById("booking").scrollIntoView({behavior: "smooth"});
    });
  });

  // Razorpay Payment
  document.getElementById("payButton").addEventListener("click", () => {
    const form = document.getElementById("bookingForm");
    const name = form.name.value;
    const email = form.email.value;
    const service = form.service.value;
    const comments = form.comments.value;

    if (!name || !email || !service) {
      alert("Please fill all required fields");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // replace with your Razorpay key
      amount: 50000, // Example ₹500 in paise (100 paise = ₹1)
      currency: "INR",
      name: "NovaNest",
      description: `Booking for ${service}`,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}\\nService: ${service}\\nComments: ${comments}`);
        // TODO: Send details to your backend (name, email, service, comments, payment ID)
      },
      prefill: {
        name: name,
        email: email,
      },
      notes: {
        service: service,
        comments: comments,
      },
      theme: {
        color: "#2563EB"
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  });
});
