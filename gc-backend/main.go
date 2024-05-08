package main

import (
	"gc-backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()

	corsConfig.AllowOrigins = []string{
		"http://localhost:4200",
	}

	// router.Use(func(c *gin.Context) {
	// 	c.Header("Content-Security-Policy", "default-src 'self' http://localhost:4200")
	// 	c.Next()
	// })

	router.Use(cors.New(corsConfig))

	router.GET("/counters", handlers.GetCounters)

	router.GET("/counters/:id", handlers.GetCounter)

	router.PUT("/counters/:id", handlers.ChangeCounter)

	router.Run(":8000")
}
