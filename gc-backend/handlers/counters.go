package handlers

import (
	"fmt"
	"gc-backend/models"
	"os"

	"github.com/pocketbase/pocketbase"
)

func GetCountersFromDatabase(app *pocketbase.PocketBase) []models.Counter {
	counters := []models.Counter{}

	err := app.Dao().DB().
		NewQuery("SELECT id, value_1, value_2, user_id FROM counters").
		All(&counters)

	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v\n", err)
	}
	return counters
}
