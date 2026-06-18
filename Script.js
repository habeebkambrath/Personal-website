// Typewriter Animation Logic
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 80;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

// Initialize Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
});

// Main Interactive Features
$(document).ready(function() {
    
    // Intersection Observer for Reveal Animations
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add animate.css bounce or zoom if specific items
                    if (entry.target.id === 'feedback-ico') {
                        entry.target.classList.add('animate__animated', 'animate__heartBeat');
                    }
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.12
        });

        document.querySelectorAll('.reveal-element, #feedback-ico').forEach(el => {
            revealObserver.observe(el);
        });

        // Active Navigation Link Highlighting on Scroll
        const navCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        $('.navbar-nav .nav-item').removeClass('active');
                        const activeLink = $(`.navbar-nav a[href="#${id}"]`);
                        if (activeLink.length) {
                            activeLink.parent().addClass('active');
                        }
                    }
                }
            });
        };

        const navObserver = new IntersectionObserver(navCallback, {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        });

        document.querySelectorAll('section, header').forEach(sec => {
            navObserver.observe(sec);
        });
    } else {
        // Fallback for older browsers
        $('.reveal-element').addClass('visible');
    }

    // jQuery Validate form validation rules
    if ($.fn.validate) {
        $("#submit-form").validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 2
                },
                maildid: {
                    required: true,
                    email: true
                },
                txtmsg: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                fullname: {
                    required: "Please enter your name.",
                    minlength: "Name must be at least 2 characters long."
                },
                maildid: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email address."
                },
                txtmsg: {
                    required: "Please write your message.",
                    minlength: "Message must be at least 5 characters long."
                }
            }
        });
    }

    // Navbar Auto-Collapse on mobile click outside
    $(document).click(function(event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.parents('.navbar-collapse').length) {
            $(".navbar-toggler").click();
        }
    });

    // Back to Top button scroll handler
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back2Top').fadeIn(300);
        } else {
            $('#back2Top').fadeOut(300);
        }
    });
    
    $("#back2Top").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    // Custom WhatsApp Widget Toggle Action
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var whatsappSendLink = document.getElementById('whatsapp-send-link');
    if (whatsappSendLink) {
        if (isMobile) {
            whatsappSendLink.setAttribute('href', 'https://wa.me/919809106214');
        } else {
            whatsappSendLink.setAttribute('href', 'https://web.whatsapp.com/send?phone=919809106214');
        }
    }

    $('#whatsapp-toggle-btn').click(function(e) {
        e.stopPropagation();
        $('#whatsapp-chat-bubble').toggleClass('active');
        if ($('#whatsapp-chat-bubble').hasClass('active')) {
            $('#whatsapp-chat-bubble').css('display', 'block');
            setTimeout(() => {
                $('#whatsapp-chat-bubble').css('opacity', '1').css('transform', 'translateY(0)');
            }, 10);
        } else {
            $('#whatsapp-chat-bubble').css('opacity', '0').css('transform', 'translateY(15px)');
            setTimeout(() => {
                $('#whatsapp-chat-bubble').css('display', 'none');
            }, 300);
        }
    });

    // Close WhatsApp bubble on click outside
    $(document).click(function(e) {
        var container = $("#whatswidget-pre-wrapper");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('#whatsapp-chat-bubble').hasClass('active')) {
                $('#whatsapp-chat-bubble').removeClass('active');
                $('#whatsapp-chat-bubble').css('opacity', '0').css('transform', 'translateY(15px)');
                setTimeout(() => {
                    $('#whatsapp-chat-bubble').css('display', 'none');
                }, 300);
            }
        }
    });

    // Smooth Scrolling Malayalam News Ticker
    var tickerInterval;
    function startTicker() {
        $("#ticker01 li:first").slideUp(500, function() {
            $(this).appendTo($("#ticker01")).show();
        });
    }

    function stopTicker() {
        clearInterval(tickerInterval);
    }

    tickerInterval = setInterval(startTicker, 3200);

    $("#ticker01").hover(
        function() { stopTicker(); },
        function() { tickerInterval = setInterval(startTicker, 3200); }
    );
});
