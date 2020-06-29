$(window).load(function() {

  var tl = new TimelineMax({
      paused: true
    }),
    tlback = new TimelineMax({
      paused: true
    }),
    intro = new TimelineMax();

  intro
    .from('.phone', 1, {
      autoAlpha: 0
    })
    .from('.hello', 0.5, {
      autoAlpha: 0
    }, 0.5)

  tl
    .to('.hello', 0.3, {
      autoAlpha: 0
    })
    .set('.home', {
      className: '+=active'
    })
    .set('.item', {
      scale: 1
    }) // fix for a bug when on of the item was appearing at 0.5 scale
    .to('.home', 0.1, {
      scale: 1.2,
      yoyo: true,
      repeat: 1
    })
    .to('.home', 0.3, {
      x: 20,
      y: 20,
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0)
    .staggerFrom('.item', 0.7, {
      left: 20,
      top: 20,
      autoAlpha: 0,
      scale: 0.5,
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1);

  tlback
    .set('.home', {
      className: '-=active'
    })
    .staggerTo('.item', 0.7, {
      left: 20,
      top: 20,
      autoAlpha: 0,
      scale: 0.5,
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1)
    .to('.hello', 0.3, {
      autoAlpha: 1
    })
    .to('.home', 0.3, {
      x: 0,
      y: 0,
      ease: Power2.easeOut
    }, 0.5);

  $(document).on('click', '.home:not(.active)', function(e) {
    event.preventDefault();
    tl.play(0);
  });

  $(document).on('click', '.home.active, .item', function(e) {
    event.preventDefault();
    TweenMax.to($(this), 0.1, {
      scale: 1.2,
      yoyo: true,
      repeat: 1,
      onComplete: function() {
        tlback.play(0)
      }
    });
  });

});
