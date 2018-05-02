import changeView from './modules/utils/change-view';
import IntroView from './modules/game/intro-view';
import GreetingView from './modules/game/greeting-view';
import RulesView from './modules/game/rules-view';
import HeaderView from './modules/game/header-view';
import ResultsView from './modules/game/results-view';
import GamePresenter from './modules/game/game-presenter';
import Loader from './modules/utils/loader';
import onLoadError from './modules/utils/on-load-error';

const App = {
  start() {
    this.showIntro();
    // const logdata = (data) => {console.log(data)};
    // Loader.loadData().
    //     then(logdata).
    //     catch(onLoadError);
  },

  showIntro() {
    const onAction = () => {
      this.showGreeting();
    };

    const intro = new IntroView(onAction);
    changeView([intro.element]);
  },

  backToIntro() {
    this.showIntro();
  },

  showGreeting() {
    const onAction = () => {
      this.showRules();
    };

    const greeting = new GreetingView(onAction);
    changeView([greeting.element]);
  },

  onBack() {
    this.showIntro();
  },

  showRules() {
    const onStartGame = (playerName) => {
      this.showGame(playerName);
    };

    const header = new HeaderView({onBack: this.onBack.bind(this)});
    const rules = new RulesView(onStartGame);

    changeView([header.element, rules.element]);
  },

  showGame(playerName) {
    const startGame = (data) => {
      const game = new GamePresenter({
        playerName,
        levels: data,
        onBack: this.onBack.bind(this),
        showResults: this.showResults.bind(this)
      });

      game.start();
    };

    Loader.loadData().
        then(startGame).
        catch(onLoadError);
  },

  showResults({state, answers}) {
    const header = new HeaderView({onBack: this.onBack.bind(this)});
    const results = new ResultsView({state, answers});

    changeView([header.element, results.element]);
  }
};

App.start();
