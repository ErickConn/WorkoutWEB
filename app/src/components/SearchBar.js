import React from "react";
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder }) {
  return (
    <section className={styles.card}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </section>
  );
}