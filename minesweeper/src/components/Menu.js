import React from 'react';

export default function Menu() {
  return (
    <form onSubmit={async (e) => e.preventDefault()}>
      <label htmlFor="boardSize">
        Choose Board Size
        <select name="boardSize" id="boardSize">
          <option value="5">Small</option>
          <option value="7">Medium</option>
          <option value="10">Big</option>
        </select>
      </label>
      <label htmlFor="difficulty">
        Choose Difficulty
        <select name="diffuculty" id="diffuculty">
          <option value="5">Easy</option>
          <option value="10">Medium</option>
          <option value="15">Hard</option>
        </select>
      </label>
    </form>
  );
}
