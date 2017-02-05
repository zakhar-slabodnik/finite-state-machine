class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config === undefined) {
        throw new Error();
      }
      this.config = config;
      this.state = config.initial;
      this.history = [config.initial];
      this.cursor = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.config.states[state] === undefined) {
        throw new Error();
      }
      this.history = this.history.slice(0, this.cursor + 1);
      this.history.push(this.state);
      this.cursor += 1;
      this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.config.states[this.state].transitions[event] === undefined) {
        throw new Error();
      }
      this.state = this.config.states[this.state].transitions[event];
      this.history = this.history.slice(0, this.cursor + 1);
      this.history.push(this.state);
      this.cursor += 1; // history: [ normal state ], cursor: 1 -> [normal, state1, state2], cursor: 2
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      return this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
