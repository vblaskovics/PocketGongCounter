package handlers

import (
	"encoding/json"
	"fmt"
	"gc-backend/database"
	"io"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetCounters(c *gin.Context) {
	c.JSON(http.StatusOK, database.GetCountersFromDatabase(database.Connect()))
}

func GetCounter(c *gin.Context) {
	id, err := strconv.Atoi((c.Param("id")))
	if err != nil {
		fmt.Println("Unkown ID!", err)
	}
	counter := database.GetCounterFromDatabase(database.Connect(), id)
	if counter.ID != 0 {
		c.JSON(http.StatusOK, counter)
	} else {
		c.JSON(http.StatusNotFound, "404 hiba")
	}
}

func ChangeCounter(c *gin.Context) {
	id, err := strconv.Atoi((c.Param("id")))
	if err != nil {
		fmt.Println("Unkown ID!", err)
	}
	println(id)
	reqBody, err := io.ReadAll(c.Request.Body)
	if err != nil {
		fmt.Println("Error reading body:", err)
	}

	c.Request.Body.Close()

	var numberFromBody int
	json.Unmarshal(reqBody, &numberFromBody)

	updatedRows := database.ChangeCounterInDatabase(database.Connect(), numberFromBody, id)
	if updatedRows == 1 {
		c.JSON(http.StatusOK, "200")
	}

}
