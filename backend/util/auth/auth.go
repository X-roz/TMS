package auth

import (
	"context"
	"encoding/json"
	"errors"
	"time"
	"truck-management-service/util/response"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
)

type Myclaims struct {
	jwt.StandardClaims
	UserId    string
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

func GenerateAuth(userId string) string {

	var claims Myclaims

	claims.UserId = userId
	claims.IssuedAt = time.Now()
	claims.ExpiredAt = time.Now().Add(time.Hour * 12)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "error while generating the token"
	}

	return t
}

func AuthVerification(token string) (jwt.Claims, bool) {

	t, err := jwt.ParseWithClaims(token, &Myclaims{}, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}

		return []byte("secret"), nil

	})
	if err != nil {
		return nil, false
	}

	return t.Claims, t.Valid

}

func VerifyToken(next echo.HandlerFunc) echo.HandlerFunc {

	logger.Info("Auth verification starts ...")

	return func(c echo.Context) error {

		var AuthToken string

		for key, value := range c.Request().Header {
			if key == "Authorization" {
				AuthToken = value[0]
			}
		}
		var data Myclaims
		claims, verify := AuthVerification(AuthToken)
		claimByte, _ := json.Marshal(claims)
		json.Unmarshal(claimByte, &data)
		if !verify {
			logger.Error("[VerifyToken]", "Token Verification Error :", "Token invalid or expired")
			return response.RespErr(c, "Token Verification Error :", errors.New("token invalid or expired"))
		}
		c.SetRequest(c.Request().WithContext(context.WithValue(c.Request().Context(), "UserId", data.UserId)))

		logger.Info("Token Verified")
		return next(c)
	}

}
