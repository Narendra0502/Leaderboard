import React from "react"
import styles from "../styles/Leaderboard.module.css"

const Leaderboard = ({ users = [], pagination = null, onPageChange = null }) => {
  // Function to format points with commas
  const formatPoints = (points) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Get top 3 users
  const topThree = users.slice(0, 3)
  const remaining = users.slice(3)

  const ProfileImage = ({ user, size = "md" }) => {
    const sizeClass =
      size === "lg" ? styles.profileImageLarge : size === "sm" ? styles.profileImageSmall : styles.profileImageMedium

    return (
      <div className={`${styles.profileImageContainer} ${sizeClass}`}>
        {user.profileImage ? (
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt={`${user.name}'s profile`}
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.noImage}>👤</div>
        )}
      </div>
    )
  }

  const TopThreeCard = ({ user, position, isWinner = false }) => (
    <div className={`${styles.topCard} ${isWinner ? styles.winnerCard : ""}`}>
      {isWinner && (
        <div className={styles.crownContainer}>
          <div className={styles.crownIcon}>👑</div>
        </div>
      )}

      <div className={styles.topCardContent}>
        <div className={styles.profileContainer}>
          <ProfileImage user={user} size={isWinner ? "lg" : "md"} />
          <div className={`${styles.positionBadge} ${styles[`position${position}`]}`}>{position}</div>
        </div>

        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.name}</h3>
          <div className={styles.pointsContainer}>
            <span className={styles.trophyIcon}>🏆</span>
            <span className={styles.points}>{formatPoints(user.points)}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const RemainingUserRow = ({ user, position }) => (
    <div className={styles.userRow}>
      <div className={styles.rankNumber}>{position}</div>
      <ProfileImage user={user} size="sm" />
      <div className={styles.userNameRow}>{user.name}</div>
      <div className={styles.userPointsRow}>
        <span className={styles.points}>{formatPoints(user.points)}</span>
        <span className={styles.trophyIcon}>🏆</span>
      </div>
    </div>
  )

  return (
    <>

      <div className={styles.leaderboard}>
        {/* Decorative background elements */}
        <div className={styles.decorativeElements}>
          <div className={`${styles.decorativeShape} ${styles.shape1}`}></div>
          <div className={`${styles.decorativeShape} ${styles.shape2}`}></div>
          <div className={`${styles.decorativeShape} ${styles.shape3}`}></div>
          <div className={`${styles.decorativeShape} ${styles.shape4}`}></div>
          <div className={`${styles.decorativeTrophy} ${styles.trophy1}`}>🏆</div>
          <div className={`${styles.decorativeTrophy} ${styles.trophy2}`}>🏆</div>
        </div>

        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Leaderboard</h1>
            <p className={styles.subtitle}>Top performers this week</p>
          </div>

          {/* Top 3 Section */}
          {topThree.length > 0 && (
            <div className={styles.topThreeSection}>
              <div className={styles.podium}>
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className={styles.podiumPosition}>
                    <TopThreeCard user={topThree[1]} position={2} />
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div className={styles.podiumPosition}>
                    <TopThreeCard user={topThree[0]} position={1} isWinner />
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className={styles.podiumPosition}>
                    <TopThreeCard user={topThree[2]} position={3} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Remaining Users */}
          {remaining.length > 0 && (
            <div className={styles.remainingUsers}>
              {remaining.map((user, index) => {
                const globalPosition = (pagination?.page - 1) * (pagination?.limit || 10) + index + 4;
                return (
                  <RemainingUserRow key={user._id} user={user} position={globalPosition} />
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {users.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🏆</div>
              <p className={styles.emptyTitle}>No users found</p>
              <p className={styles.emptySubtitle}>Be the first to join the leaderboard!</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}

      </div>
      {pagination && onPageChange && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            ← Previous
          </button>
          <span className={styles.pageInfo}>
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
          >
            Next →
          </button>
        </div>
      )}
    </>
  )
}

export default Leaderboard
