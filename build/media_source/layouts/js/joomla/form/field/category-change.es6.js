/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
((Joomla) => {
  Joomla.loadingLayer('load');
  const id = Joomla.getOptions('category-change');
  const element = document.querySelector(`#${id}`);

  if (!element) {
    throw new Error('Category Id element not found');
  }

  if (element.getAttribute('data-refresh-catid') && element.value !== element.getAttribute('data-cat-id')) {
    element.value = element.getAttribute('data-refresh-catid');
  } else {
    // No custom fields
    element.setAttribute('data-refresh-catid', element.value);
  }

  window.Joomla.categoryHasChanged = (el) => {
    if (el.value === el.getAttribute('data-refresh-catid')) {
      return;
    }

    Joomla.loadingLayer('show');
    document.body.appendChild(document.createElement('joomla-core-loader'));

    // Custom Fields
    if (el.getAttribute('data-refresh-section')) {
      document.querySelector('input[name=task]').value = `${el.getAttribute('data-refresh-section')}.reload`;
    }

    element.form.submit();
  };
})(Joomla);