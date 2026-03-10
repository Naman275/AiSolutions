/* ============================================
   RudrAI — Demo Reel Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ======== SIDEBAR SCROLL TRACKING ========
    const sections = document.querySelectorAll('.demo-section');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    const observerOptions = { threshold: 0.3 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                sidebarItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.target === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(s => sectionObserver.observe(s));

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = document.getElementById(item.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ======== WHATSAPP CHAT DEMO ========
    const waChatArea = document.getElementById('waChatArea');
    const waFlowSteps = document.querySelectorAll('.wa-flow-step');
    const replayWABtn = document.getElementById('replayWA');

    const waConversation = [
        { step: 1, msgs: [
            { type: 'out', text: 'Hi', time: '10:30 AM' },
            { type: 'in', text: 'Hello! 👋 Welcome to <strong>Sharma\'s Bakery</strong>!\n\nI\'m your automated assistant. How can I help?', time: '10:30 AM',
              buttons: ['🍰 Order Cake', '🍞 View Menu', '📞 Talk to Us'] }
        ]},
        { step: 2, msgs: [
            { type: 'out', text: '🍰 Order Cake', time: '10:31 AM' },
            { type: 'in', text: 'Great choice! 🎂 Here\'s our cake menu:', time: '10:31 AM',
              catalog: [
                { emoji: '🎂', name: 'Red Velvet Cake', price: '₹699' },
                { emoji: '🍫', name: 'Chocolate Truffle', price: '₹599' },
                { emoji: '🍓', name: 'Strawberry Cake', price: '₹549' }
              ]
            },
            { type: 'in', text: 'Reply with the cake name to order! 👆', time: '10:31 AM' }
        ]},
        { step: 3, msgs: [
            { type: 'out', text: 'Red Velvet Cake', time: '10:32 AM' },
            { type: 'in', text: '🎂 <strong>Red Velvet Cake - ₹699</strong>\n\nHow many do you want?', time: '10:32 AM',
              buttons: ['1', '2', '3'] },
            { type: 'out', text: '1', time: '10:32 AM' },
            { type: 'in', text: 'Perfect! 📍 Please share your delivery address:', time: '10:32 AM' },
            { type: 'out', text: '42, MG Road, Connaught Place, New Delhi', time: '10:33 AM' },
            { type: 'in', text: '✅ Got it! Here\'s your order summary:\n\n🎂 Red Velvet Cake x 1\n📍 42, MG Road, CP, Delhi\n💰 <strong>Total: ₹699</strong>\n🚚 Delivery in 45 min\n\nProceed to pay?', time: '10:33 AM',
              buttons: ['✅ Pay Now', '❌ Cancel'] }
        ]},
        { step: 4, msgs: [
            { type: 'out', text: '✅ Pay Now', time: '10:33 AM' },
            { type: 'in', text: '💳 Pay ₹699 via UPI:\n\n<strong>UPI ID:</strong> sharmasbakery@paytm\n\nOr click below to pay instantly 👇', time: '10:33 AM',
              buttons: ['📱 Pay with Google Pay', '📱 Pay with PhonePe'] },
        ]},
        { step: 5, msgs: [
            { type: 'in', text: '✅ <strong>Payment Received!</strong>\n\n🎉 Your order <strong>#ORD2026-1847</strong> is confirmed!\n\n🎂 Red Velvet Cake x 1\n📍 42, MG Road, CP, Delhi\n⏰ Arriving by <strong>11:18 AM</strong>\n🚚 Delivery partner: Rahul K.\n\nTrack your order anytime by replying "TRACK"\n\nThank you for ordering! ❤️🍰', time: '10:34 AM' },
        ]}
    ];

    let waPlayed = false;

    function createWAMessage(msg) {
        const div = document.createElement('div');
        div.className = `wa-m ${msg.type === 'in' ? 'in' : 'out'}`;

        let html = `<p>${msg.text.replace(/\n/g, '<br>')}</p>`;

        if (msg.catalog) {
            html += '<div class="wa-catalog-items">';
            msg.catalog.forEach(item => {
                html += `<div class="wa-ci"><span class="wa-ci-emoji">${item.emoji}</span><div class="wa-ci-info"><strong>${item.name}</strong>${item.price}</div></div>`;
            });
            html += '</div>';
        }

        if (msg.buttons) {
            html += '<div class="wa-btns">';
            msg.buttons.forEach(b => {
                html += `<button>${b}</button>`;
            });
            html += '</div>';
        }

        html += `<span class="wa-t">${msg.time}</span>`;
        div.innerHTML = html;
        return div;
    }

    function playWADemo() {
        waChatArea.innerHTML = '';
        waFlowSteps.forEach(s => s.classList.remove('active'));

        let totalDelay = 0;

        waConversation.forEach((step) => {
            step.msgs.forEach((msg, i) => {
                totalDelay += (msg.type === 'in' ? 1200 : 600);

                setTimeout(() => {
                    // Highlight step
                    waFlowSteps.forEach(s => s.classList.remove('active'));
                    const currentStep = document.querySelector(`.wa-flow-step[data-step="${step.step}"]`);
                    if (currentStep) currentStep.classList.add('active');

                    // Also highlight all previous steps
                    for (let j = 1; j < step.step; j++) {
                        const prev = document.querySelector(`.wa-flow-step[data-step="${j}"]`);
                        if (prev) prev.classList.add('active');
                    }

                    waChatArea.appendChild(createWAMessage(msg));
                    waChatArea.scrollTop = waChatArea.scrollHeight;
                }, totalDelay);
            });
        });
    }

    // Play WA demo when section is visible
    const waSection = document.getElementById('demo-whatsapp');
    const waObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !waPlayed) {
                waPlayed = true;
                setTimeout(playWADemo, 500);
            }
        });
    }, { threshold: 0.15 });
    waObserver.observe(waSection);

    // Also auto-play after a short delay as a fallback
    setTimeout(() => {
        if (!waPlayed && waChatArea) {
            waPlayed = true;
            playWADemo();
        }
    }, 2000);

    if (replayWABtn) {
        replayWABtn.addEventListener('click', () => {
            waPlayed = true;
            playWADemo();
        });
    }

    // ======== AI CHATBOT INTERACTIVE DEMO ========
    const cbMessages = document.getElementById('cbMessages');
    const cbQuickActions = document.getElementById('cbQuickActions');
    const cbInput = document.getElementById('cbInput');
    const cbSend = document.getElementById('cbSend');

    const botResponses = {
        appointment: {
            user: '📅 Book Appointment',
            bot: `Sure! I'd be happy to help you book an appointment. 📅\n\nOur available slots for <strong>tomorrow</strong>:\n\n🕐 10:00 AM - Dr. Priya Sharma\n🕐 11:30 AM - Dr. Rajesh Gupta\n🕐 2:00 PM - Dr. Priya Sharma\n🕐 4:30 PM - Dr. Anita Desai\n\nWhich slot works for you?`,
            followupBtns: ['10:00 AM', '2:00 PM', '4:30 PM']
        },
        hours: {
            user: '🕐 Working Hours',
            bot: `Here are our working hours: 🏥\n\n<strong>Monday - Saturday:</strong> 9:00 AM - 7:00 PM\n<strong>Sunday:</strong> 10:00 AM - 2:00 PM\n<strong>Emergency:</strong> Available 24/7\n\n📍 Location: 15, Park Street, Mumbai\n📞 Helpline: +91 98765 43210\n\nWould you like to book an appointment?`
        },
        doctors: {
            user: '👨‍⚕️ Our Doctors',
            bot: `Our expert team: 👨‍⚕️\n\n<strong>Dr. Priya Sharma</strong>\n• General Physician | 15 yrs exp\n• ⭐ 4.8 rating (2.1k reviews)\n\n<strong>Dr. Rajesh Gupta</strong>\n• Cardiologist | 20 yrs exp\n• ⭐ 4.9 rating (1.8k reviews)\n\n<strong>Dr. Anita Desai</strong>\n• Pediatrician | 12 yrs exp\n• ⭐ 4.7 rating (950 reviews)\n\nWant to book with any of them?`
        },
        pricing: {
            user: '💰 Consultation Fee',
            bot: `Here are our consultation fees: 💰\n\n<strong>General Consultation:</strong> ₹500\n<strong>Specialist Consultation:</strong> ₹800\n<strong>Follow-up (within 7 days):</strong> FREE ✅\n<strong>Online Consultation:</strong> ₹400\n\nAll fees include basic diagnostics. Insurance accepted.\n\nWant to proceed with booking?`
        },
        emergency: {
            user: '🚨 Emergency',
            bot: `🚨 <strong>For emergencies, please call immediately:</strong>\n\n📞 <strong>Emergency Hotline: +91 98765 43211</strong>\n🚑 Ambulance: 108\n\nOur emergency team is available <strong>24/7</strong>.\n\n⚠️ If this is a life-threatening emergency, please call 112 immediately.\n\nStay calm — help is on the way! 🏥`
        },
        human: {
            user: '👤 Talk to Human',
            bot: `Sure! I'm connecting you to our reception team... 👤\n\n⏳ <strong>Estimated wait time: 30 seconds</strong>\n\nWhile you wait, is there anything quick I can help with?\n\n💡 Tip: For faster service, you can also call us at +91 98765 43210`
        }
    };

    function addBotMessage(html) {
        const div = document.createElement('div');
        div.className = 'cb-msg bot';
        div.innerHTML = `<div class="cb-bot-icon"><i class="fas fa-robot"></i></div><div class="cb-bubble"><p>${html.replace(/\n/g, '<br>')}</p></div>`;
        cbMessages.appendChild(div);
        cbMessages.scrollTop = cbMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'cb-msg user';
        div.innerHTML = `<div class="cb-bubble"><p>${text}</p></div>`;
        cbMessages.appendChild(div);
        cbMessages.scrollTop = cbMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'cb-msg bot typing-msg';
        div.innerHTML = `<div class="cb-bot-icon"><i class="fas fa-robot"></i></div><div class="cb-bubble"><div style="display:flex;gap:4px;padding:4px 0"><span style="width:8px;height:8px;border-radius:50%;background:var(--text-muted);animation:tp 1.4s infinite"></span><span style="width:8px;height:8px;border-radius:50%;background:var(--text-muted);animation:tp 1.4s infinite 0.2s"></span><span style="width:8px;height:8px;border-radius:50%;background:var(--text-muted);animation:tp 1.4s infinite 0.4s"></span></div></div>`;
        cbMessages.appendChild(div);
        cbMessages.scrollTop = cbMessages.scrollHeight;
        return div;
    }

    // Add typing animation CSS
    const tpStyle = document.createElement('style');
    tpStyle.textContent = `@keyframes tp{0%,60%,100%{opacity:.3;transform:scale(.8)}30%{opacity:1;transform:scale(1)}}`;
    document.head.appendChild(tpStyle);

    document.querySelectorAll('.cb-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const response = botResponses[action];
            if (!response) return;

            addUserMessage(response.user);

            const typing = addTypingIndicator();
            setTimeout(() => {
                typing.remove();
                addBotMessage(response.bot);
            }, 1200);
        });
    });

    if (cbSend) {
        cbSend.addEventListener('click', () => {
            const val = cbInput.value.trim();
            if (!val) return;
            addUserMessage(val);
            cbInput.value = '';

            const typing = addTypingIndicator();
            setTimeout(() => {
                typing.remove();
                addBotMessage(`Thank you for your message! 😊 Our team will look into "<strong>${val}</strong>" and get back to you shortly.\n\nIn the meantime, feel free to use the quick options above. 👆`);
            }, 1500);
        });

        cbInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') cbSend.click();
        });
    }

    // ======== MOBILE APP SCREEN SWITCHER ========
    const appNavBtns = document.querySelectorAll('.app-nav-btn');
    const appScreens = document.querySelectorAll('.app-screen-slide');

    appNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const screen = btn.dataset.screen;
            appNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appScreens.forEach(s => {
                s.classList.remove('active');
                if (s.id === `appScreen${screen}`) s.classList.add('active');
            });
        });
    });

    // ======== VOICE AI CALL DEMO ========
    const startCallBtn = document.getElementById('startCallBtn');
    const callStatus = document.getElementById('callStatus');
    const callDuration = document.getElementById('callDuration');
    const callTranscript = document.getElementById('callTranscript');

    const callScript = [
        { speaker: 'ai', text: '🔔 Ring ring... Connecting...', delay: 1000 },
        { speaker: 'ai', text: 'Namaste! Welcome to HealthFirst Clinic. I\'m your AI assistant. How can I help you today? Press 1 for appointments, 2 for reports, or just tell me what you need.', delay: 2000 },
        { speaker: 'caller', text: 'I want to book an appointment for tomorrow', delay: 3500 },
        { speaker: 'ai', text: 'Sure! I can help with that. Which doctor would you like to see? We have Dr. Priya Sharma - General Physician, and Dr. Rajesh Gupta - Cardiologist.', delay: 3000 },
        { speaker: 'caller', text: 'Dr. Priya Sharma please', delay: 2500 },
        { speaker: 'ai', text: 'Dr. Priya Sharma — great choice! I have available slots tomorrow at 10 AM, 2 PM, and 4:30 PM. Which time works best for you?', delay: 3000 },
        { speaker: 'caller', text: '2 PM please', delay: 2000 },
        { speaker: 'ai', text: 'Perfect! I\'ve booked your appointment with Dr. Priya Sharma tomorrow at 2:00 PM. ✅ You\'ll receive a confirmation on WhatsApp shortly. Is there anything else I can help with?', delay: 3500 },
        { speaker: 'caller', text: 'No, that\'s all. Thank you!', delay: 2000 },
        { speaker: 'ai', text: 'Thank you for calling HealthFirst Clinic! Have a great day. Goodbye! 😊', delay: 2000 }
    ];

    let callPlaying = false;

    function playCallDemo() {
        if (callPlaying) return;
        callPlaying = true;
        callTranscript.innerHTML = '';
        callStatus.textContent = 'Calling...';
        startCallBtn.disabled = true;
        startCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> <span>Demo Playing...</span>';

        let totalDelay = 0;
        let seconds = 0;

        // Start timer
        const timer = setInterval(() => {
            seconds++;
            const m = String(Math.floor(seconds / 60)).padStart(2, '0');
            const s = String(seconds % 60).padStart(2, '0');
            callDuration.textContent = `${m}:${s}`;
        }, 1000);

        setTimeout(() => { callStatus.textContent = 'Connected • Voice AI Active'; }, 1500);

        callScript.forEach((line) => {
            totalDelay += line.delay;
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `ct-line ${line.speaker}`;
                div.innerHTML = `<span class="ct-label">${line.speaker === 'ai' ? '🤖 AI Assistant' : '👤 Caller'}</span>${line.text}`;
                callTranscript.appendChild(div);
                callTranscript.scrollTop = callTranscript.scrollHeight;
            }, totalDelay);
        });

        // End call
        setTimeout(() => {
            clearInterval(timer);
            callStatus.textContent = 'Call Ended';
            callPlaying = false;
            startCallBtn.disabled = false;
            startCallBtn.innerHTML = '<i class="fas fa-redo"></i> <span>Replay Demo Call</span>';
        }, totalDelay + 2000);
    }

    if (startCallBtn) {
        startCallBtn.addEventListener('click', playCallDemo);
    }

    // ======== SCROLL-TRIGGERED ANIMATIONS ========
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const scrollAnimObserver = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });

    document.querySelectorAll('.web-step, .crm-metric, .cb-feat, .vb-card, .ai-use-case').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollAnimObserver.observe(el);
    });

    // Stagger delay for crm metrics
    document.querySelectorAll('.crm-metric').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });

    // ======== CRM BAR CHART ANIMATION ========
    const crmSection = document.getElementById('demo-crm');
    const crmObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.crm-bar').forEach(bar => {
                    bar.style.animation = 'none';
                    bar.offsetHeight; // Trigger reflow
                    bar.style.animation = 'barGrow 1s ease forwards';
                });
            }
        });
    }, { threshold: 0.3 });
    crmObserver.observe(crmSection);
});




// ---- Theme Toggle ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

const savedTheme = localStorage.getItem('rudrai-theme') || 'dark';
if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
} else {
    root.removeAttribute('data-theme');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (themeIcon) themeIcon.style.transform = 'rotate(360deg) scale(0)';
        setTimeout(() => {
            if (newTheme === 'light') {
                root.setAttribute('data-theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            } else {
                root.removeAttribute('data-theme');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            }
            localStorage.setItem('rudrai-theme', newTheme);
            if (themeIcon) themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 250);
    });
}