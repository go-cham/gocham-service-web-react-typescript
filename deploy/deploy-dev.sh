#!/bin/bash
export CONTENT_TYPE='Content-types: application/json'

export DATA='{ text: "[dev] 고참 서비스 페이지 배포 완료", "attachments": [ { "fallback": "", "color": "good", "fields": [ { "title": "REACT_APP_ENV : development", "short": true } ], "footer": "gocham-service-web-react-typescript", "mrkdwn_in": [ "text" ] } ] }'

curl -X POST -H "$CONTENT_TYPE" --data "$DATA" https://hooks.slack.com/services/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
