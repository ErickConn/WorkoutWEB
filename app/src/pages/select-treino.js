import React from 'react';
import ReactDOM from 'react-dom/client';
import "./select-treino.css";

export default function Selecttreino() {
    return (<><div className="app-container">
        <header className="app-header">
            🏆 <h1>Champion's Body</h1>
        </header>

        <main className="content">
            <div className="banner-blue">
                <h2>Escolha Seu Treino</h2>
                <p>Selecione o treino de hoje</p>
            </div>

            <div className="card card-last-workout">
                <div className="card-header-small">
                    <span>📅 ÚLTIMO TREINO</span>
                </div>
                <h3>Treino A - Peito e Tríceps</h3>
                <p className="text-muted">Realizado há 2 dias</p>
            </div>

            <div className="section-title">PLANO ABC - SUGESTÃO</div>

            <div className="card card-green" onclick="redirect()">
                <div className="card-header-flex">
                    <span className="badge-title">✨ RECOMENDADO HOJE</span>
                    <span className="arrow">➔</span>
                </div>
                <h2>Treino B</h2>
                <p className="subtitle">Costas e Bíceps</p>
                <div className="card-stats">
                    <span>6 exercícios</span> • <span>~50 min</span>
                </div>
            </div>

            <div className="card card-white" onclick="redirect()">
                <div className="card-body-flex">
                    <div className="icon-letter bg-blue-light">A</div>
                    <div className="workout-info">
                        <h3>Treino A</h3>
                        <p className="text-muted">Peito e Tríceps</p>
                    </div>
                    <div className="workout-time">
                        <span className="time-label">Última vez</span>
                        <p><strong>2 dias atrás</strong></p>
                    </div>
                </div>
                <div className="card-footer-stats">
                    <span>5 exercícios</span> • <span>~45 min</span>
                </div>
            </div>

            <div className="card card-white" onclick="redirect()">
                <div className="card-body-flex">
                    <div className="icon-letter bg-purple-light">C</div>
                    <div className="workout-info">
                        <h3>Treino C</h3>
                        <p className="text-muted">Pernas e Ombros</p>
                    </div>
                    <div className="workout-time">
                        <span className="time-label">Última vez</span>
                        <p><strong>4 dias atrás</strong></p>
                    </div>
                </div>
                <div className="card-footer-stats">
                    <span>7 exercícios</span> • <span>~60 min</span>
                </div>
            </div>

            <div className="divider">
                <span>OU</span>
            </div>

            <div className="card card-purple" onclick="redirect()">
                <div className="card-header-flex">
                    <span className="badge-title">✨ PERSONALIZE</span>
                    <span className="arrow">➔</span>
                </div>
                <h2>Treino Livre</h2>
                <p className="subtitle">Monte sua própria sessão</p>
                <p className="small-text">Escolha os exercícios que você quer fazer hoje</p>
            </div>
        </main>

        <nav className="bottom-nav">
            <div className="nav-item active">
                <span className="nav-icon">💪</span>
                <span>Treino</span>
            </div>
            <div className="nav-item">
                <span className="nav-icon">📈</span>
                <span>Progresso</span>
            </div>
        </nav>
    </div></>
    )

}