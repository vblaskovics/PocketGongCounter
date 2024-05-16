package models

type Counter struct {
	Id      string `db:"id" json:"id"`
	Value_1 int    `db:"value_1" json:"value_1"`
	Value_2 int    `db:"value_2" json:"value_2"`
	User_id string `db:"user_id" json:"user_id"`
}
