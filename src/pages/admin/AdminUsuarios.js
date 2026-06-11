import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './admin.module.css';
import { fetchUsersList, fetchCurrentUser, adminUpdateUser, adminDeleteUser } from '../../redux/user/slice';
import OffCanvasNavBar from '../../components/OffCanvasNavBar';
import ConfirmModal from '../../components/ConfirmModal';
import EditRoleModal from './components/EditRoleModal';
import Spinner from '../../components/Spinner';
import { AlertContext } from '../../context/AlertContext';
import { getErrorMessage } from '../../utils/helpers';

export default function AdminUsuarios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const currentUser = useSelector(state => state.userReducer.currentUser);
    const users = useSelector(state => state.userReducer.users);
    const loading = useSelector(state => state.userReducer.loading);

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('todos');

    // Edit role modal state
    const [editingUser, setEditingUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    // Delete confirmation modal state
    const [deletingUser, setDeletingUser] = useState(null);

    // Load data on mount
    useEffect(() => {
        dispatch(fetchCurrentUser());
        dispatch(fetchUsersList());
    }, [dispatch]);

    // Filtered users
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.nome?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase());
            const matchesRole = roleFilter === 'todos' || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    // Stats
    const stats = useMemo(() => ({
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        alunos: users.filter(u => u.role === 'aluno').length,
    }), [users]);

    // Current user ID
    const currentUserId = currentUser?._id || currentUser?.id;

    // ── Handlers ──────────────────────────────────────────────

    const handleOpenEdit = (user) => {
        setEditingUser(user);
        setSelectedRole(user.role);
    };

    const handleRoleChange = async (newRole) => {
        if (!editingUser) return;
        setSelectedRole(newRole);
        // Se o role não mudou, não faz nada
        if (newRole === editingUser.role) return;
        const userId = editingUser._id || editingUser.id;
        try {
            await dispatch(adminUpdateUser({ id: userId, updatedData: { role: newRole } })).unwrap();
            showAlert(`Cargo de ${editingUser.nome} alterado para ${newRole === 'admin' ? 'Administrador' : 'Aluno'}.`, 'success');
            setEditingUser(null);
        } catch (err) {
            showAlert(getErrorMessage(err, 'Erro ao alterar cargo.'), 'danger');
        }
    };

    const handleOpenDelete = (user) => {
        const userId = user._id || user.id;
        if (String(userId) === String(currentUserId)) {
            showAlert('Você não pode deletar sua própria conta por aqui.', 'warning');
            return;
        }
        setDeletingUser(user);
    };

    const handleConfirmDelete = async () => {
        if (!deletingUser) return;
        const userId = deletingUser._id || deletingUser.id;
        try {
            await dispatch(adminDeleteUser(userId)).unwrap();
            showAlert(`Usuário ${deletingUser.nome} removido com sucesso.`, 'success');
            setDeletingUser(null);
        } catch (err) {
            showAlert(getErrorMessage(err, 'Erro ao deletar usuário.'), 'danger');
        }
    };

    // ── Access control ────────────────────────────────────────

    if (loading && !currentUser) {
        return (
            <div className={styles.pageWrapper}>
                <OffCanvasNavBar />
                <Spinner className="vh-100" />
            </div>
        );
    }

    if (currentUser && currentUser.role !== 'admin') {
        return (
            <div className={styles.pageWrapper}>
                <OffCanvasNavBar />
                <div className={styles.container}>
                    <div className={styles.accessDenied}>
                        <div className={styles.accessDeniedIcon}>🔒</div>
                        <h2 className={styles.accessDeniedTitle}>Acesso Restrito</h2>
                        <p className={styles.accessDeniedText}>
                            Esta página é exclusiva para administradores.
                        </p>
                        <button className={styles.btnVoltar} onClick={() => navigate('/perfil')}>
                            Voltar ao Perfil
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Render helpers ────────────────────────────────────────

    const getInitials = (nome) => nome?.substring(0, 2).toUpperCase() || '??';
    const isSelf = (user) => String(user._id || user.id) === String(currentUserId);

    const renderUserRow = (user) => {
        const userId = user._id || user.id;
        const self = isSelf(user);

        return (
            <tr key={userId}>
                <td>
                    <div className={styles.userCell}>
                        {user.imagem ? (
                            <img src={user.imagem} alt={user.nome} className={styles.avatar} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>{getInitials(user.nome)}</div>
                        )}
                        <div>
                            <div className={styles.userName}>
                                {user.nome}
                                {self && <span className={styles.selfBadge}>Você</span>}
                            </div>
                            <div className={styles.userEmail}>{user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span className={`${styles.badge} ${user.role === 'admin' ? styles.badgeAdmin : styles.badgeAluno}`}>
                        {user.role === 'admin' ? '🛡️ Admin' : '🏋️ Aluno'}
                    </span>
                </td>
                <td>
                    <div className={styles.actionsCell}>
                        <button
                            className={`${styles.btnAction} ${styles.btnEdit}`}
                            onClick={() => handleOpenEdit(user)}
                            title="Editar cargo"
                            id={`edit-user-${userId}`}
                        >
                            ✏️
                        </button>
                        <button
                            className={`${styles.btnAction} ${styles.btnDelete} ${self ? styles.btnDisabled : ''}`}
                            onClick={() => !self && handleOpenDelete(user)}
                            title={self ? 'Não é possível deletar sua própria conta' : 'Deletar usuário'}
                            id={`delete-user-${userId}`}
                            disabled={self}
                        >
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    const renderMobileCard = (user) => {
        const userId = user._id || user.id;
        const self = isSelf(user);

        return (
            <div className={styles.mobileCard} key={userId}>
                {user.imagem ? (
                    <img src={user.imagem} alt={user.nome} className={styles.avatar} />
                ) : (
                    <div className={styles.avatarPlaceholder}>{getInitials(user.nome)}</div>
                )}
                <div className={styles.mobileCardInfo}>
                    <div className={styles.mobileCardName}>
                        {user.nome}
                        {self && <span className={styles.selfBadge}>Você</span>}
                    </div>
                    <div className={styles.mobileCardEmail}>{user.email}</div>
                    <div className={styles.mobileCardBottom}>
                        <span className={`${styles.badge} ${user.role === 'admin' ? styles.badgeAdmin : styles.badgeAluno}`}>
                            {user.role === 'admin' ? '🛡️ Admin' : '🏋️ Aluno'}
                        </span>
                        <div className={styles.mobileCardActions}>
                            <button
                                className={`${styles.btnAction} ${styles.btnEdit}`}
                                onClick={() => handleOpenEdit(user)}
                                title="Editar cargo"
                            >
                                ✏️
                            </button>
                            <button
                                className={`${styles.btnAction} ${styles.btnDelete} ${self ? styles.btnDisabled : ''}`}
                                onClick={() => !self && handleOpenDelete(user)}
                                title={self ? 'Não é possível deletar sua própria conta' : 'Deletar usuário'}
                                disabled={self}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ── Main render ───────────────────────────────────────────

    return (
        <div className={styles.pageWrapper}>
            <OffCanvasNavBar />

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <h1 className={styles.title}>
                            <span>👥</span> Gerenciar Usuários
                        </h1>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.statsGrid}>
                    <div className={`${styles.statCard} ${styles.statTotal}`}>
                        <div className={styles.statValue}>{stats.total}</div>
                        <div className={styles.statLabel}>Total</div>
                    </div>
                    <div className={`${styles.statCard} ${styles.statAdmin}`}>
                        <div className={styles.statValue}>{stats.admins}</div>
                        <div className={styles.statLabel}>Admins</div>
                    </div>
                    <div className={`${styles.statCard} ${styles.statAluno}`}>
                        <div className={styles.statValue}>{stats.alunos}</div>
                        <div className={styles.statLabel}>Alunos</div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <input
                        id="admin-search-users"
                        type="text"
                        className={styles.searchInput}
                        placeholder="🔍  Buscar por nome ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        id="admin-filter-role"
                        className={styles.filterSelect}
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="todos">Todos os cargos</option>
                        <option value="admin">Administradores</option>
                        <option value="aluno">Alunos</option>
                    </select>
                </div>

                {/* Loading */}
                {loading && <Spinner />}

                {/* Users Table (desktop) */}
                {!loading && (
                    <div className={styles.tableCard}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th>Cargo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(renderUserRow)
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            <div className={styles.emptyState}>
                                                <div className={styles.emptyIcon}>🔎</div>
                                                <div className={styles.emptyText}>Nenhum usuário encontrado</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Users Cards (mobile) */}
                {!loading && (
                    <div className={styles.mobileCards}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(renderMobileCard)
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>🔎</div>
                                <div className={styles.emptyText}>Nenhum usuário encontrado</div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Edit Role Modal */}
            <EditRoleModal
                show={!!editingUser}
                user={editingUser}
                role={selectedRole}
                onRoleChange={handleRoleChange}
                onCancel={() => setEditingUser(null)}
                loading={loading}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={!!deletingUser}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeletingUser(null)}
                title="Deletar Usuário"
                message={`Tem certeza que deseja remover ${deletingUser?.nome}? Esta ação é permanente e não pode ser desfeita.`}
                confirmLabel="Sim, Deletar"
                cancelLabel="Cancelar"
                variant="danger"
                icon="🗑️"
            />
        </div>
    );
}
