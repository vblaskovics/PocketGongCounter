package handlers

import (
	"fmt"
	"gc-backend/models"
	"os"

	"github.com/pocketbase/pocketbase"
)

func GetUsersFromDatabase(app *pocketbase.PocketBase) []models.User {
	users := []models.User{}

	err := app.Dao().DB().
		NewQuery("SELECT id, email, password FROM users").
		All(&users)

	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
	}
	return users
}
