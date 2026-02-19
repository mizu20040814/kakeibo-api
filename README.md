# Kakeibo API - 家計簿REST API

Spring Boot + PostgreSQL で構築した家計簿管理のREST APIです。  
支出の登録・取得・更新・削除（CRUD）に加え、カテゴリ別・月別の集計機能を備えています。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **言語** | Java 17 (Amazon Corretto) |
| **フレームワーク** | Spring Boot 3.5 |
| **ORM** | Spring Data JPA (Hibernate) |
| **データベース** | PostgreSQL 16 |
| **ビルドツール** | Gradle (Kotlin DSL) |
| **コンテナ** | Docker / Docker Compose |
| **テスト** | JUnit 5 / Mockito |

## アーキテクチャ

```
Controller → Service → Repository → PostgreSQL
   (API)     (ロジック)   (DB操作)      (データ)
```

実務で標準的な4層アーキテクチャを採用しています。

- **Controller** - HTTPリクエストの受付とレスポンス返却
- **Service** - バリデーション・ビジネスロジック
- **Repository** - データベースアクセス（Spring Data JPA）
- **DTO** - リクエスト/レスポンスの型定義（EntityとAPIの分離）
- **Exception Handler** - グローバルなエラーハンドリング

## プロジェクト構成

```
src/main/java/com/.../kakeiboapi/
├── controller/
│   ├── HealthController.java       # ヘルスチェック
│   └── ExpenseController.java      # 支出API
├── dto/
│   ├── ExpenseRequest.java         # リクエストDTO（バリデーション付き）
│   └── ExpenseResponse.java        # レスポンスDTO
├── entity/
│   └── Expense.java                # 支出エンティティ
├── repository/
│   └── ExpenseRepository.java      # カスタムクエリ含むリポジトリ
├── service/
│   └── ExpenseService.java         # ビジネスロジック
├── exception/
│   └── GlobalExceptionHandler.java # エラーハンドリング
└── KakeiboApiApplication.java
```

## API エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/expenses` | 支出一覧取得 |
| GET | `/api/expenses/{id}` | 支出詳細取得 |
| GET | `/api/expenses/category/{category}` | カテゴリ別取得 |
| GET | `/api/expenses/monthly/{year}/{month}` | 月別取得 |
| POST | `/api/expenses` | 支出登録 |
| PUT | `/api/expenses/{id}` | 支出更新 |
| DELETE | `/api/expenses/{id}` | 支出削除 |

### リクエスト例

```json
{
  "date": "2026-02-19",
  "amount": 850,
  "category": "食費",
  "memo": "ランチ"
}
```

### バリデーション

| フィールド | ルール |
|-----------|--------|
| date | 必須 |
| amount | 必須、1以上 |
| category | 必須、50文字以内 |
| memo | 任意、200文字以内 |

## セットアップ

### 前提条件

- Java 17 (Amazon Corretto 推奨)
- Docker / Docker Compose

### 起動手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/mizu20040814/kakeibo-api.git
cd kakeibo-api

# 2. PostgreSQLを起動
docker compose up -d

# 3. アプリケーションを起動
./gradlew bootRun
```

http://localhost:8080/api/expenses でAPIにアクセスできます。

### テスト実行

```bash
./gradlew test
```

## 今後の予定

- [ ] Spring Securityによる認証機能
- [ ] Next.jsフロントエンドとの連携
- [ ] CI/CD（GitHub Actions）