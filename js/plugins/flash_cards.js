$(document).ready(function(){
  UnoPico.ready(function($statev1){
    var QAS = $statev1.get()?$statev1.get():[]
    window.qas = QAS
    var defaultQAS = [
      {q: 'Hello', a: '안녕하세요'},
      {q: 'How many licks does it take to get to the center of a Tootsie Pop?', a:'The world may never know.'},
      {q: 'Have you been an un-American?', a:'Ooh-ooh-hoo-ooh!'}
    ]

    var renderDeck = function renderDeck(){
      var tmpls = []
      var loop = QAS.length?QAS: defaultQAS
      console.log('LOOP', loop)
      for(var i = 0; i < loop.length; i++){
        var qa = loop[i]
        var tmpl = `
            <li class="card">
              <div class="side_one">
                <p>${qa.q}</p>
              </div>
              <div class="side_two">
                <p>${qa.a}</p>
              </div>
            </li>`
        tmpls.push(tmpl)
      }
      $('#deck').html(tmpls.join(''))
      $('#deck').cycle({
        after:   onAfter,
        before:  onBefore,
        fx:      'shuffle',
        next:    '#next',
        prev:    '#prev',
        shuffle: {
          top:   -300,
          left:  20
        },
        speed:   'fast',
        timeout: 0,
      });
      function onBefore(){
        $(this).parent().find('.current').removeClass('current');
      }
      function onAfter(){
        $(this).addClass('current');
      }
    }

    var renderQAList = function renderQaList(){
      var tmpls = []
      for(var i = 0; i< QAS.length; i++){
        var qa = QAS[i]
        tmpls.push(`
          <li>
            <h5>${qa.q}</h5>
            <pre>${qa.a}</pre>
          </li>
        `)
      }
      $('#add-more-list').html(tmpls.join(''))
    }

    renderDeck()
    // FLIP
    $('#flipper').bind('click', function(){
      $('.card.current').toggleClass('flip');
    });

    // CYCLE

    // Keyboard Nav
    var key = {left: 37, up: 38, right: 39, down: 40, enter: 13, space: 32, questionMark: 191 };
    $(document).keydown(function (e) {
      if(!$('#deck').is(':visible')) return

      var keyCode = e.keyCode || e.which;


      switch (keyCode) {
        case key.left:
          $('#deck').cycle('prev');
          e.preventDefault();
          break;
        case key.right:
          $('#deck').cycle('next');
          e.preventDefault();
          break;
        case key.up:
        case key.down:
        case key.enter:
        case key.space:
          $('.current').toggleClass('flip');

          break;
        case key.questionMark:
          $('#keyboard_shortcuts').fadeToggle();
          e.preventDefault();
          break;
      }
    });
    $('#keyboard_shortcuts_toggle').click(function(){
      $('#keyboard_shortcuts').fadeToggle();
    });

    $('#add-more-button').click(function(){
      $('#deck').hide()
      renderQAList()
      $('#add-more-view').addClass('animated slideInUp animate-speed-fast').show()
      return false
    })

    $('#add-more-save-button').click(function(){
      $statev1.set(QAS)
      $('#deck').show()
      $('#add-more-view').removeClass('animated slideInUp animate-speed-fast').hide()
      renderDeck()
    })

    $('#add-more-form').submit(function(){
      var $q = $('#add-more-form input[name=q]')
      var $a = $('#add-more-form textarea[name=a]')
      QAS.push({
        q: $q.val(),
        a: $a.val()
      })
      renderQAList()
      $q.val('')
      $a.val('')
      return false
    })
  })
});





