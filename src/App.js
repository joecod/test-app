import React, { useState } from 'react';
import regexifyString from 'regexify-string';
import './App.css';

function App() {

  return (
    <div className="App">
      <FilterableSkillsTable combatSkills={combatSkills} />
    </div>
  );
}

function CategoryRow(props) {
  const putColor = (name) => {
    if (name === 'Heal') {
      return (
        <span style={{ color: 'green' }}>
          {name}
        </span>
      )
    } else if (name === 'Buff') {
      return (
        <span style={{ color: 'blue' }}>
          {name}
        </span>
      )
    } else if (name === 'Melee') {
      return (
        <span style={{ color: 'darkred' }}>
          {name}
        </span>
      )
    } else if (name === 'Ranged') {
      return (
        <span style={{ color: 'indianred' }}>
          {name}
        </span>
      )
    } else {
      return name
    }
  }

  return (
    <tr>
      <th colSpan="6">
        {putColor(props.category)}
      </th>
    </tr>
  )
}

function Row(props) {
  const reactStringReplace = require('react-string-replace');
  const applyColor = (text) => {
    return (
      <td>
        {reactStringReplace(text, 'Torch', (match, i) => (
          <span key={i} style={{ color: 'red' }}>{match}</span>
        ))}
      </td>
    )
  }

  const applyColors = (text) => {
    var parts = text.split(/(Stress)/i);
    if (parts.length > 1) { console.log(parts) }
    for (var i = 1; i < parts.length; i += 2) {
      parts[i] = <span className="colorred" key={i}>{parts[i]}</span>;
    }
    return <td>{parts}</td>;
  }

  const tagColors = [
    { tag: 'Unholy', style: 'colorblue' },
    { tag: 'Stress', style: 'colorred' },
    { tag: 'Torch', style: 'colororange' }
  ]

  const applyColors2 = (text) => {
    var parts = text.split(/(\s+)/);
    for (var i = 0; i < parts.length; i ++) {
      // eslint-disable-next-line no-loop-func
      tagColors.forEach(tc => {
        //console.log(tc.tag+ ' '+ tc.style);
        if (parts[i] === tc.tag) {
          
          parts[i] = <span className={tc.style} key={i}>{parts[i]}</span>;
          
        }
      })
    }    
    return <td>{parts}</td>;
  }

  return (
    <tr>
      <td>{props.skill.name}</td>
      <td>{props.skill.rank}</td>
      <td>{props.skill.target}</td>
      {applyColors2(props.skill.effect)}
      <td>{props.skill.self}</td>
      <td>{props.skill.heal}</td>
    </tr>
  )
}



function Table(props) {
  const rows = (combatSkills, filter) => {
    const rowsArray = [];
    let lastCategory = null;
    combatSkills.forEach((skill) => {
      if (skill.range.indexOf(filter) === -1) {
        if (skill.effect.indexOf(filter) === -1) {
          if (skill.self.indexOf(filter) === -1) {
            return
          }
        }
      }
      if (skill.range !== lastCategory) {
        rowsArray.push(
          <CategoryRow
            category={skill.range}
            key={skill.range} />
        );
      }
      rowsArray.push(
        <Row
          key={skill.name}
          skill={skill}
        />
      );
      lastCategory = skill.range;
    });
    return rowsArray;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rank</th>
          <th>Target</th>
          <th>Effect</th>
          <th>Self</th>
          <th>Heal</th>
        </tr>
      </thead>
      <tbody>{rows(props.combatSkills, props.filter)}</tbody>
    </table>
  )
}

function SearchBar(props) {
  return (
    <form>
      <input
        value={props.filterText}
        onChange={props.filterTextChangeHandler}
        type="text"
        placeholder="Search..."
      />
      <p>
        <input type="checkbox" />Melee/Ranged {'   '}
        <input type="checkbox" />Buff{'   '}
        <input type="checkbox" />Heal
      </p>
    </form>
  )
}

function FilterableSkillsTable(props) {
  const [filterText, setFilterText] = useState('')
  const filterTextChangeHandler = (e) => {
    setFilterText(e.target.value)
  }
  return (
    <div>
      <SearchBar
        filterText={filterText}
        filterTextChangeHandler={filterTextChangeHandler} />
      <Table combatSkills={props.combatSkills} filter={filterText} />
    </div>
  )
}

export default App;

const combatSkills = [
  {
    name: "Smite",
    range: "Melee",
    rank: "12",
    target: "12",
    damage: "0",
    accuracy: "85",
    crit: "0",
    effect: "+15% DMG vs Unholy",
    self: "",
    heal: ""
  },
  {
    name: "Zealous Accusation",
    range: "Ranged",
    rank: "12",
    target: "1-2",
    damage: "-40",
    accuracy: "85",
    crit: "-4",
    effect: "",
    self: "",
    heal: ""
  },
  {
    name: "Bulwark of Faith",
    range: "Buff",
    rank: "12",
    target: "self",
    damage: "",
    accuracy: "",
    crit: "",
    effect: "Torch +24",
    self: "+20% PROT, Mark self",
    heal: ""
  },
  {
    name: "Battle Heal",
    range: "Heal",
    rank: "1234",
    target: "1234",
    damage: "",
    accuracy: "",
    crit: "",
    effect: "",
    self: "",
    heal: "2-3"
  },
  {
    name: "Inspiring Cry",
    range: "Heal",
    rank: "1234",
    target: "1234",
    damage: "",
    accuracy: "",
    crit: "",
    effect: "Stress -5, Torch +5",
    self: "",
    heal: "1-1"
  }
]