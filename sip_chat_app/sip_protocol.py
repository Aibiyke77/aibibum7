# sip_protocol.py
def parse_sip_message(raw_message):
    """
    Простейший парсер SIP-сообщения из строки.
    Возвращает dict с ключами From, To, Body (если есть).
    """
    lines = raw_message.strip().split('\n')
    result = {}
    for line in lines:
        if line.startswith('From:'):
            result['From'] = line[5:].strip()
        elif line.startswith('To:'):
            result['To'] = line[3:].strip()
        elif line.startswith('Body:'):
            result['Body'] = line[5:].strip()
    return result

def create_invite(from_user, to_user):
    return f"INVITE sip:{to_user}@sip.local SIP/2.0\nFrom: {from_user}\nTo: {to_user}"

def create_message(from_user, body):
    return f"MESSAGE sip:* SIP/2.0\nFrom: {from_user}\nBody: {body}"
