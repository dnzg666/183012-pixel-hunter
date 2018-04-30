import AbstractView from "../utils/abstract-view";

export default class ResultsView extends AbstractView {
  constructor({state, answers}) {
    super();
    this.state = state;
    this.answers = answers;
  }

  get template() {
    const successAnswers = this.answers.reduce(function (sum, current) {
      if (current !== `wrong` && current !== `unknown`) {
        return (sum += 1);
      }
      return sum;
    }, 0);
    const fastAnswers = this.answers.reduce((sum, current) => {
      if (current === `fast`) {
        return (sum += 1);
      }
      return sum;
    }, 0);
    const slowAnswers = this.answers.reduce((sum, current) => {
      if (current === `slow`) {
        return (sum += 1);
      }
      return sum;
    }, 0);

    return `<div class="result">
    <h1>${(this.state.lives >= 0) ? `Победа!` : `FAIL`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${this.answers.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
          </ul>
        </td>
        ${(this.state.lives >= 0) ? `<td class="result__points">×&nbsp;100</td>` : ``}
        <td class="result__total">${(this.state.lives >= 0) ? (successAnswers * 100) : ``}</td>
        ${(this.state.lives < 0) ? `<td class="result__total  result__total--final">fail</td>` : ``}
      </tr>
      ${(this.state.lives >= 0 && fastAnswers > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${fastAnswers * 50}</td>
      </tr>` : ``}
      ${(this.state.lives > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.state.lives * 50}</td>
      </tr>` : ``}
      ${(this.state.lives >= 0 && slowAnswers > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${slowAnswers * -50}</td>
      </tr>` : ``}
      ${(this.state.lives >= 0) ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${this.state.points}</td>
      </tr>` : ``}
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    </div>`;
  }
}