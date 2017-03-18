$(document).ready(function() {

  $('#note_form').on('submit', addItem);
  $('body').ready(createItem);

  function addItem(event) {
    // Init form values
    var $item_name = $('.item_name').val(),
        $item_text = $('.item_text').val(),
        date = new Date();

    var options = {
      year: 'numeric',
			month: 'long',
			day: 'numeric',
			timezone: 'UTC',
			hour: 'numeric',
			minute: 'numeric',
    };

    var day = date.toLocaleString('ru', options);

    // Form validation
    if(!validateForm($item_name, $item_text)) return false;


    var data = {
      note_name: $item_name,
      note_text: $item_text,
      note_time: day,
      note_id: 0
    }

    // Set values to local Storage
    if(localStorage.getItem('noteItems') === null) {
      var noteItems = [];
          noteItems.push(data);
      localStorage.setItem('noteItems', JSON.stringify(noteItems));
    } else {
      noteItems = JSON.parse(localStorage.getItem('noteItems'));
      for( var i = 0; i < noteItems.length; i++ ) {
        noteItems[i].note_id += 1;
      }

      noteItems.push(data);
      localStorage.setItem('noteItems', JSON.stringify(noteItems));
    }

     createItem();
     event.preventDefault();

  }

  function createItem() {
    // Get local storage item
    var noteItems = JSON.parse(localStorage.getItem('noteItems'));
    noteItems.reverse();

    var $list = $('.list');
        $list.text(' ');

    // Get item's values and create item
    for( var i = 0; i < noteItems.length; i++ ) {

      var name = noteItems[i].note_name,
          text = noteItems[i].note_text,
          day = noteItems[i].note_time,
          note_id = noteItems[i].note_id;

      var item_panel = document.createElement('div');
          item_panel.className = 'item panel panel-primary';


      var panel_head = document.createElement('div');
          panel_head.className = 'panel-heading';

      var name_inner = document.createElement('h1');
          name_inner.innerText = name;
          name_inner.className = 'panel-title';

      var time_inner = document.createElement('time');
          time_inner.innerText = day;
          time_inner.className = 'pull-right time-inner'

      panel_head.append(name_inner, time_inner);

      var panel_body = document.createElement('div');
          panel_body.className = 'panel-body';
          panel_body.id = note_id;

      var text_inner = document.createElement('p');
          text_inner.innerText = text;


      var btn_del = document.createElement('button');
          btn_del.className = 'btn btn-danger btn_del pull-right';
          btn_del.innerText = 'delete';

          btn_del.addEventListener('click', deleteItem)

      panel_body.append(text_inner, btn_del);

      item_panel.append(panel_head, panel_body)

      $list.append(item_panel);

      $('.item_name').val(' ');
      $('.item_text').val(' ');
      $('.item_name').focus();
    }
  }

  function deleteItem() {
    var id = $(this).closest('div').attr('id'),
        noteItems = JSON.parse(localStorage.getItem('noteItems'));

    for( var i = 0; i < noteItems.length; i++ ) {
      var note_id = noteItems[i].note_id;
      if( id == note_id ) {
        noteItems.splice(i, 1)
        localStorage.setItem('noteItems', JSON.stringify(noteItems));
      }
      createItem();
      $('.item_name').focus();
    }

  }

  function validateForm(name, text) {
    // Check if form fields values exist
    if(!name || !text) {
      alert('Not valid values')

      $('.item_name').val(' ');
      $('.item_text').val(' ');
      $('.item_name').focus();
      return false;
    }

    // Check for spaces in fields
    var pattern = /^[\s]+$/

    if(pattern.test(name && text)) {

      $('.item_name').val(' ');
      $('.item_text').val(' ');
      $('.item_name').focus();
      return false;
    }
    return true;
  }

})
