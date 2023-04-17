function startClick() {
  // Нажимаем на первую существующую кнопку "откликнуться"
  const respond = () => {
    const button = document.querySelector(
      'a[data-qa="vacancy-serp__vacancy_response"]'
    );
    button.click();
  };

  // Подтверждаем отклик. Если нужна релокация или сопроводительное письмо, отменяем отклик, скрываем вакансию
  const confirm = () => {
    const hasRequiredLetterOrRelocation =
      Boolean(
        document.querySelector(
          'textarea[data-qa="vacancy-response-popup-form-letter-input"]'
        )
      ) ||
      Boolean(
        document.querySelector('button[data-qa="relocation-warning-abort"]')
      );

    const button = hasRequiredLetterOrRelocation
      ? document.querySelector(
          'button[data-qa="vacancy-response-popup-close-button"]'
        ) ||
        document.querySelector('button[data-qa="relocation-warning-abort"]')
      : document.querySelector(
          'button[data-qa="vacancy-response-submit-popup"]'
        );

    button.click();

    if (hasRequiredLetterOrRelocation) {
      const button = document.querySelector(
        'a[data-qa="vacancy-serp__vacancy_response"]'
      );

      const hideButton1 = document.querySelector(
        'div:has(a[data-qa="vacancy-serp__vacancy_response"]) button[data-qa="vacancy__blacklist-show-add"]'
      );
      hideButton1.click();

      setTimeout(() => {
        const hideButton2 = document.querySelector(
          'a[data-qa="vacancy__blacklist-menu-add-employer"]'
        );

        hideButton2.click();
      }, 500);

      button.remove();
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.target.tagName == "INPUT") {
      return;
    } else if (event.key === "a") {
      respond();
    } else if (event.key === "s") confirm();
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startClick,
  });
});
