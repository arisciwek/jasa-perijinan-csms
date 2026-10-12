with open('/www/wwwroot/jasa-perijinan-csms/public/images/services/service-1-penyusunan.svg', 'r') as f:
    content = f.read()

content = content.replace('& Survey', '& Survey')
content = content.replace('& Revisi', '& Revisi')
content = content.replace('Forms & Register', 'Forms & Register')

with open('/www/wwwroot/jasa-perijinan-csms/public/images/services/service-1-penyusunan.svg', 'w') as f:
    f.write(content)

print('Done')