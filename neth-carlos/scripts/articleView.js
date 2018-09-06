'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');

      optionTag = `<option value="${authorName}">${authorName}</option>`;

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      category = $(this).attr('data-category');

      optionTag = `<option value="${category}">${category}</option>`;

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"`).fadeIn(500);
    } else {
      $('article[data-author]').fadeIn(500);
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"`).fadeIn(500);
    } else {
      $('article[data-category]').fadeIn(500);
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('li.tab').on('click', function() {
    $('section.tab-content').hide();
    $(`section#${$(this).data('content')}`).show();
  });
  $('nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
