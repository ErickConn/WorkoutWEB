import React from "react";
import styles from './index.module.css';
import Filtro from "../../components/Filtro";

export default function BibliotecaTreino(){
    const filtros = ["Todos", "Iniciante", "Intermediário", "Avançado"];
    return(
        <>
        <div>
          <div className={styles.cardHeader}>
            <div className={styles.arrow}>←</div>
            <div className={styles.textHeader}>
              <h1 className={styles.title}>Biblioteca de Treinos</h1>
              <p className={styles.subtitle}>Planos modelo disponíveis</p>
            </div>
          </div>

          <div>
            <div className={styles.buscar}>
                <a className={styles.lupa}>🔍</a>
                <input type="text" placeholder="Buscar exercícios..."/>
            </div>

            <Filtro filtros={filtros}></Filtro>


            {/* Recomendado para Você */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide px-2">
                ✨ Recomendados para Você
              </h3>

              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    ABC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">ABC Intermediário</h3>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">3 treinos • 5-6 exercícios cada</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-white px-2 py-1 rounded-lg font-medium text-gray-700">
                        Hipertrofia
                      </span>
                      <span className="text-xs bg-white px-2 py-1 rounded-lg font-medium text-gray-700">
                        4x/semana
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400">›</div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Treino A (Peito/Tríceps), B (Costas/Bíceps), C (Pernas/Ombros)
                </p>
              </div>
            </div>

            {/* Treinos Disponíveis */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide px-2">
                Todos os Planos Modelo
              </h3>

              {/* Full Body Iniciante */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold text-lg">
                    FB
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">Full Body Iniciante</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold">
                        Iniciante
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">1 treino • 8-10 exercícios</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        Corpo Inteiro
                      </span>
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        3x/semana
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400">›</div>
                </div>
              </div>

              {/* AB Intermediário */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg">
                    AB
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">AB Intermediário</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                        Intermediário
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">2 treinos • 6-7 exercícios cada</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        Push/Pull
                      </span>
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        4x/semana
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400">›</div>
                </div>
              </div>

              {/* ABC Avançado */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold text-lg">
                    ABC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">ABC Avançado</h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                        Avançado
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">3 treinos • 7-8 exercícios cada</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        Volume Alto
                      </span>
                      <span className="text-xs bg-gray-50 px-2 py-1 rounded-lg font-medium text-gray-700">
                        5-6x/semana
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400">›</div>
                </div>
              </div>
            </div>

            {/* Meus Treinos Personalizados */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide px-2">
                💜 Meus Treinos Personalizados
              </h3>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">Treino Upper Body Custom</h3>
                    <p className="text-xs text-gray-600 mb-2">Criado por você • 8 exercícios</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-white px-2 py-1 rounded-lg font-medium text-gray-700">
                        Personalizado
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-gray-400">›</div>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Fixo */}
          <div className="bg-white border-t border-gray-200 p-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
              <span>+</span> Criar Novo Treino Personalizado
            </button>
          </div>
        </div>
        </>
    )
}