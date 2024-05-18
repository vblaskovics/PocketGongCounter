package db

import ( // "gc-backend/handlers"
	// "net/http"
	// "github.com/labstack/echo/v5"

	"log"

	"github.com/pocketbase/pocketbase"
	// "github.com/pocketbase/pocketbase/core"
)

func ConnectToDatabase() {
	app := pocketbase.New()

	// app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
	// 	e.Router.GET("/users", func(c echo.Context) error {
	// 		return c.JSON(http.StatusOK, handlers.GetUsersFromDatabase(app))
	// 	})
	// 	e.Router.GET("/counters", func(c echo.Context) error {
	// 		return c.JSON(http.StatusOK, handlers.GetCountersFromDatabase(app))
	// 	})
	// 	return nil
	// })
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
