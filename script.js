$(document).ready(function () {
  const moodCounts = {
    happy: 0,
    sad: 0,
    angry: 0,
    neutral: 0,
    tired: 0,
    love: 0
  };

  function updateStats() {
    let statsText = 'Mood Stats: ';
    for (let mood in moodCounts) {
      statsText += `${mood.charAt(0).toUpperCase() + mood.slice(1)}(${moodCounts[mood]}) `;
    }
    $('#mood-stats').text(statsText);
  }

  $('#add-entry').click(function () {
    const mood = $('#mood-select').val();
    const note = $('#mood-note').val().trim();
    if (note === '') return alert('Please write something.');

    const today = new Date().toLocaleDateString();
    const emoji = $('#mood-select option:selected').text().split(' ')[0];

    const entry = `
      <li class="entry ${mood}">
        ${emoji} <strong>${today}</strong> - <span class="note">${note}</span>
      </li>
    `;

    $('#entry-list').prepend(entry);
    $('#mood-note').val('');
    moodCounts[mood]++;
    updateStats();
  });

  $('.filter').click(function () {
    const filter = $(this).data('filter');
    if (filter === 'all') {
      $('.entry').show();
    } else {
      $('.entry').hide();
      $('.' + filter).show();
    }
  });

  // Expand note on click
  $(document).on('click', '.entry', function () {
    $(this).find('.note').slideToggle();
  });
});
