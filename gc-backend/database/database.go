package database

import (
	"database/sql"
	"fmt"
	"gc-backend/models"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func Connect() *sql.DB {
	database_url := goDotEnvVariable("TURSO_DATABASE_URL")
	token := goDotEnvVariable("TURSO_AUTH_TOKEN")
	url := "libsql://" + database_url + ".turso.io?authToken=" + token

	db, err := sql.Open("libsql", url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db %s: %s", url, err)
		os.Exit(1)
	}

	return db
}

func GetCountersFromDatabase(db *sql.DB) []models.Counter {
	rows, err := db.Query("SELECT * FROM counters")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()

	var counters = []models.Counter{}

	for rows.Next() {
		var counter models.Counter

		if err := rows.Scan(&counter.ID, &counter.Number); err != nil {
			fmt.Println("Error scanning row:", err)
			return nil
		}

		counters = append(counters, counter)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
	}

	return counters
}

func GetCounterFromDatabase(db *sql.DB, id int) models.Counter {
	var counter models.Counter

	row := db.QueryRow("SELECT * FROM counters WHERE id = (?)", id)
	err := row.Scan(&counter.ID, &counter.Number)

	if err != nil {
		fmt.Printf("No row found with id: %d", id)
	}

	return counter
}

func ChangeCounterInDatabase(db *sql.DB, num int, id int) int64 {
	result, err := db.Exec("UPDATE counters SET number = (?) WHERE id = (?)", num, id)

	if err != nil {
		log.Fatal(err)
	}

	rows, err := result.RowsAffected()

	if err != nil {
		log.Fatal(err)
	}
	if rows != 1 {
		log.Fatalf("expected single row affected, got %d rows affected", rows)
	}

	return rows
}
