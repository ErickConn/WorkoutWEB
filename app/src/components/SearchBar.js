import React from "react";
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <section className={styles.card}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  );
}